// Shape of the JSON body returned by POST /api/register and
// POST /api/login (see app_api/controllers/authentication.js).
export interface AuthResponse {
  token: string;
  name: string;
  email: string;
}

// Decoded payload of the JWT itself (see Member.generateJWT() in
// app_api/models/member.js) -- used to show the logged-in admin's
// name without a separate "who am I" API call.
export interface AuthTokenPayload {
  _id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}
