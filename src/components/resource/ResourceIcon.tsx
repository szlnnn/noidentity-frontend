import { Resource } from "../../entity/Resource.ts";
import { VscAzure } from "react-icons/vsc";
import { IoCloudOfflineOutline } from "react-icons/io5";

interface Props {
  resource: Resource;
}

const ResourceIcon = ({ resource }: Props) => {
  const isAzure = resource.azureConfig !== null;

  return (
    <>
      {isAzure ? <VscAzure size={50} /> : <IoCloudOfflineOutline size={50} />}
    </>
  );
};

export default ResourceIcon;
