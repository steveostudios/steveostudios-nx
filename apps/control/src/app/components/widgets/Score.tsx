import styled from "@emotion/styled";
import { uuidv4 } from "@firebase/util";
import { onUpdateUserSettings } from "@nx/firebase";
import { Score as IScore, Team } from "@nx/shared-assets";
import {
	Button,
	ButtonStyle,
	ColorPicker,
	List,
	LockedInput,
	NumberInput,
	Section,
} from "@nx/ui";
import WidgetHeader from "./WidgetHeader";

interface Props {
	userId: string;
	score: IScore;
}

const Score: React.FC<Props> = (props) => {
	const onChangeShow = (value: boolean) => {
		onUpdateUserSettings(props.userId, {
			score: { ...props.score, show: value },
		});
	};

	const onChangePointAmount = (value: number) => {
		onUpdateUserSettings(props.userId, {
			score: { ...props.score, pointAmount: value },
		});
	};

	const onChangeVisible = (id: string, value: boolean) => {
		const item = (props.score.teams[id] = {
			...props.score.teams[id],
			visible: value,
		});
		onUpdateUserSettings(props.userId, {
			score: {
				...props.score,
				teams: recalcItems({ ...props.score.teams, [id]: item }),
			},
		});
	};

	const onChangeName = (id: string, value: string) => {
		const item = (props.score.teams[id] = {
			...props.score.teams[id],
			name: value,
		});
		onUpdateUserSettings(props.userId, {
			score: {
				...props.score,
				teams: recalcItems({ ...props.score.teams, [id]: item }),
			},
		});
	};

	const onChangePoints = (id: string, value: number) => {
		const item = (props.score.teams[id] = {
			...props.score.teams[id],
			points: value,
		});
		onUpdateUserSettings(props.userId, {
			score: {
				...props.score,
				teams: recalcItems({ ...props.score.teams, [id]: item }),
			},
		});
	};

	const onChangeColor = (id: string, value: string) => {
		const item = (props.score.teams[id] = {
			...props.score.teams[id],
			color: value,
		});
		onUpdateUserSettings(props.userId, {
			score: {
				...props.score,
				teams: recalcItems({ ...props.score.teams, [id]: item }),
			},
		});
	};

	const recalcItems = (items: { [id: string]: Omit<Team, "id"> }) => {
		const updatedItems = Object.entries(items)
			.sort(
				(prev: [string, Omit<Team, "id">], next: [string, Omit<Team, "id">]) =>
					prev[1].order - next[1].order
			)
			.map(([id, item], i) => {
				const newItem = [
					id,
					{
						...item,
						order: i + 1,
					},
				];

				return newItem;
			});

		return Object.fromEntries(updatedItems);
	};

	const newItem = (items: Partial<Team>[]) => {
		if (!items.length) return;

		const startOrder = !Object.keys(props.score.teams).length
			? 1
			: Object.entries(props.score.teams).sort(
					(prev: [string, Team], next: [string, Team]) =>
						next[1].order - prev[1].order
			  )[0][1].order;

		const newItems = items.map((item, i) => {
			const id = uuidv4();
			const order = startOrder + i;
			const newItem: Omit<Team, "id"> = {
				name: item.name || "",
				order: order,
				visible: item.visible || true,
				points: item.points || 0,
				color: "#00ff00",
			};
			return [id, newItem];
		});

		return Object.fromEntries(newItems);
	};

	const onAddItem = () => {
		const teams = newItem([{}]);
		if (teams)
			onUpdateUserSettings(props.userId, {
				score: {
					...props.score,
					teams: recalcItems({ ...props.score.teams, ...teams }),
				},
			});
	};

	const onRemoveItem = (id: string) => {
		const items = Object.fromEntries(
			Object.entries(props.score.teams).filter(
				([itemId, item]) => itemId !== id
			)
		);
		onUpdateUserSettings(props.userId, {
			score: { ...props.score, teams: recalcItems({ ...items }) },
		});
	};

	return (
		<>
			<WidgetHeader
				icon="tally"
				title="Score"
				show={props.score.show}
				onChangeShow={onChangeShow}
			/>
			<Section padding>
				<Button slug="addTeam" name="Team" icon="plus" onClick={onAddItem} />
				<NumberInput
					slug="pointAmount"
					label="Point Amount"
					inline
					value={props.score.pointAmount}
					onChange={onChangePointAmount}
				/>
			</Section>
			<Section fullHeight padding paddingBottom>
				<List>
					{props.score.teams &&
						Object.entries(props.score.teams)
							.sort((a: [string, Team], b: [string, Team]) =>
								a[1].order < b[1].order ? -1 : a[1].order > b[1].order ? 1 : 0
							)
							.map(([id, item], i) => {
								item = { ...item, id: id };
								return (
									<Row
										key={id}
										{...item}
										pointAmount={props.score.pointAmount}
										onChangePoints={onChangePoints}
										onChangeVisible={onChangeVisible}
										onChangeColor={onChangeColor}
										onChangeName={onChangeName}
										onRemove={onRemoveItem}
									/>
								);
							})}
				</List>
			</Section>
		</>
	);
};

export default Score;

interface RowProps extends Team {
	onChangeVisible: (id: string, value: boolean) => void;
	onChangeName: (id: string, value: string) => void;
	onChangePoints: (id: string, value: number) => void;
	onChangeColor: (id: string, value: string) => void;
	onRemove: (id: string) => void;
	pointAmount: number;
}

const Row: React.FC<RowProps> = (props) => {
	return (
		<RowContainer visible={props.visible}>
			<div>
				<Button
					slug="handle"
					name={String(props.order)}
					skin={ButtonStyle.CLEAR}
					onClick={() => {
						return;
					}}
					disabled
				/>
				{props.visible ? (
					<Button
						slug="visible"
						icon="eye"
						skin={ButtonStyle.CLEAR}
						onClick={() => props.onChangeVisible(props.id, false)}
					/>
				) : (
					<Button
						slug="hide"
						icon="eye-slash"
						skin={ButtonStyle.CLEAR}
						onClick={() => props.onChangeVisible(props.id, true)}
					/>
				)}
				<ColorPicker
					slug="color"
					value={props.color}
					onChange={(value) => props.onChangeColor(props.id, value)}
				/>
				<LockedInput
					slug="name"
					value={props.name}
					onChange={(value) => props.onChangeName(props.id, value)}
				/>
				<Button
					slug="delete"
					icon="trash"
					skin={ButtonStyle.CLEAR}
					onClick={() => props.onRemove(props.id)}
				/>
			</div>
			<div>
				<NumberInput
					slug="points"
					value={props.points}
					onChange={(value) => props.onChangePoints(props.id, value)}
				/>
				<Button
					slug="remove"
					icon="minus"
					skin={ButtonStyle.PRIMARY}
					onClick={() =>
						props.onChangePoints(props.id, props.points - props.pointAmount)
					}
				/>
				<Button
					slug="add"
					skin={ButtonStyle.SECONDARY}
					icon="plus"
					onClick={() =>
						props.onChangePoints(props.id, props.points + props.pointAmount)
					}
				/>
			</div>
		</RowContainer>
	);
};

const RowContainer = styled("li")(
	{
		display: "flex",
		padding: "1rem",
		flexDirection: "column",
		"> div": {
			display: "flex",
			gap: "1rem",
		},
	},
	(props: { visible: boolean }) => {
		if (!props.visible) {
			return {
				"> *": { opacity: 0.25 },
			};
		}

		return {};
	}
);
