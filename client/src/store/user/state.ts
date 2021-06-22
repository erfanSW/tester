export interface UserInterface {
  username?: string;
  password?: string;
  role?: number;
  phone?: string;
}

const state: UserInterface = {
  phone: "",
};

export default state;
