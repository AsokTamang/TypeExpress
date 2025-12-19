import type { Request, Response, NextFunction } from "express";
export const validateNumericId = (
  req: Request<{ id: string }>, //as the id is passed in the req params,our generic type in the req params is {id:string}
  res: Response<{ message: string }>,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    res.json({ message: "Invalid Id" });
  } else {
    next();
  }
};

export const pleaseAuth = (
  req: Request<{}, unknown, {}, { password: string }>,  //as the params has an id which is of type string, and the response body and req body is unknown, but the query has an object of password with value typed string
  res: Response<{ message: string }>,
  next: NextFunction
) => {
  const { password } = req.query;
  if (password === "please") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized attempt" });
  }
};
