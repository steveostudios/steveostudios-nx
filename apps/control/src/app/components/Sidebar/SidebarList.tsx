import styled from "@emotion/styled";
import { List } from "@nx/ui";
import { File } from "../../fake-data";

interface Props {
  files?: File[];
}

const SidebarList: React.FC<Props> = (props) => {

  return (
    <div>
      <List>
        {props.files?.map(file => <Item key={file.id}>{file.name}</Item>)}
      </List>
    </div>
  );
};

export default SidebarList;

const Item = styled("li")({
})