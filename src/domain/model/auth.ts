export interface AuthPayload {
  userId: string;
  username: string;
  token: string;
  tokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
}
