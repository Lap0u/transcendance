
  export type TypeUserDto = {
	id: string;
	username: string;
	name: string;
	accountUsername: string;
	isTwoFactorAuthenticationEnabled: boolean;
	authConfirmToken?: string;
	isVerified?: boolean;
	twoFactorAuthenticationSecret?: string;
	email: string;
	avatar: string;
	points: number;
	rank?: number;
	socketsConnection?: string[];
	frienList?: TypeUserDto[];
	currentGames?: number;
  };

const UserDto = {
	account_id:"",
	id: "",
	username: "",
	name: "",
	accountUsername: "",
	isTwoFactorAuthenticationEnabled: false,
	authConfirmToken: "",
	isVerified: "",
	twoFactorAuthenticationSecret: "",
	email: "",
	avatar: "",
	points: "",
	rank: undefined,
	status: undefined,
	usesrOnline: [],
	currentGames: 0,
	frienList: [],
  };

  
  export default UserDto;