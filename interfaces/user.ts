import { informationNode } from ".";

interface user {
  email: string;
  username?: string;
  password?: string;
  connectedNodes?: informationNode[];
}

export default user;
