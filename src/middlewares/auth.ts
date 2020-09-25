import jwt from "jsonwebtoken";

class AuthMiddleware {

  // verifyUserExists(req: any, res: any, next: Function) {
  //     let user = req.nameUser;

  //     // if ( role === 'ADMIN_ROLE' || role === 'SUPER_ROLE') {
  //     //     next()
  //     // } else {
  //     //     return res.status(401).json({
  //     //         ok: false,
  //     //         err: { msg: 'User Unauthorized' }
  //     //     });
  //     // }
  // }

  verifyToken(req: any, res: any, next: Function) {
    let token = req.get("token");
    const seed: string = process.env.SEED ? process.env.SEED : "";
    jwt.verify(token, seed, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ ok: false, err });
      }
      req.user = (<any>decoded).user;
      // console.log(req.user);
      next();
    });
  }

  verifyAdminRole(req: any, res: any, next: Function) {
    let user = req.user;
    let role = user.descriptUserRole;
    if (role === "ADMIN_ROLE" || role === "SUPER_ROLE") {
      next();
    } else {
      return res.status(401).json({
        ok: false,
        err: { msg: "User Unauthorized" },
      });
    }
  }
  
}

const authMiddleware = new AuthMiddleware();
export default authMiddleware;
