
  export type TypeUserDto = {
	account_id : string,
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
	isVerified: undefined,
	twoFactorAuthenticationSecret: "",
	email: "",
	avatar: "",
	points: 0,
	rank: 0,
	status: 0,
	usesrOnline: [],
	currentGames: 0,
	frienList: [],
  };

  
  export default UserDto;