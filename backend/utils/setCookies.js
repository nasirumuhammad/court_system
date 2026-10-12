export const setCookies = (res, accessToken, refreshToken) => {
  const accessTokenOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
  };

  const refreshTokenOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  res.cookie("AccessToken", accessToken, accessTokenOptions);
  res.cookie("RefreshToken", refreshToken, refreshTokenOptions);
};