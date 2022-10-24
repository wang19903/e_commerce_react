import { useNavigate } from "react-router-dom";
import {
  DirectoryItemContainer,
  BackGroundImage,
  Body,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const navigate = useNavigate();
  const { title, imageUrl, route } = category;
  const onNavigateHandler = () => navigate(route);
  return (
    <DirectoryItemContainer>
      <BackGroundImage
        imageUrl={imageUrl}
        onClick={onNavigateHandler}
      ></BackGroundImage>
      <Body>
        <h2>{title}</h2>
        <p>shop now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
