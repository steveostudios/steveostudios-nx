import { Builders, builders } from "@nx/shared-assets";
import { TextInput } from "@nx/ui";
import styled from "@emotion/styled";
import { Colors } from "@nx/style";

export interface CreateFileModalData {
	name: string;
	builder: string;
}

interface Props {
	data: CreateFileModalData;
	setData: ({ name, builder }: CreateFileModalData) => void;
}

const CreateFileModal: React.FunctionComponent<Props> = (props) => {
	return (
		<Container>
			<BuilderList>
				{builders.map((builder) => (
					<Builder
						key={builder.slug}
						onClick={(name) =>
							props.setData({ ...props.data, builder: builder.slug })
						}
						disabled={
							builder.slug !== Builders.PICKME &&
							builder.slug !== Builders.WHEEL &&
							builder.slug !== Builders.BOXES
						}
						selected={builder.slug === props.data.builder}
					>
						<img src={builder.circle} alt={builder.name} />
						<div>
							<h2>{builder.name}</h2>
							<p>{builder.shortDescription}</p>
						</div>
					</Builder>
				))}
			</BuilderList>
			<TextInput
				label="Name"
				slug="name"
				value={props.data.name}
				onChange={(name) => props.setData({ ...props.data, name: name })}
			/>
		</Container>
	);
};

export default CreateFileModal;

const Container = styled("div")({});

const BuilderList = styled("div")({
	display: "grid",
	gridTemplateColumns: "repeat(3, 40rem)",
	gap: 1,
	paddingBottom: "2rem",
	marginBottom: "2rem",
	borderBottom: `1px solid ${Colors.gray7}`,
});

const Builder = styled("div")(
	{
		width: "34rem",
		display: "flex",
		padding: "2rem",
		borderRadius: "1rem",
		gap: "2rem",
		h2: {
			margin: 0,
			padding: 0,
		},
		p: {
			margin: 0,
			padding: 0,
		},
		img: {
			width: "6rem",
			height: "6rem",
		},
	},
	(props: { selected: boolean; disabled: boolean }) => {
		let options = {};
		if (props.selected) {
			options = { ...options, backgroundColor: Colors.gray10 };
		}
		if (props.disabled) {
			options = { ...options, opacity: 0.25 };
		}

		return options;
	}
);
