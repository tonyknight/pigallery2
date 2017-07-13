import * as _express from "express";
import {NextFunction, Request, Response} from "express";
import * as _path from "path";
import {Utils} from "../../common/Utils";
import {Config} from "../../common/config/private/Config";
import {ProjectPath} from "../ProjectPath";
import {AuthenticationMWs} from "../middlewares/user/AuthenticationMWs";

export class PublicRouter {

  public static route(app) {
    const renderIndex = (req: Request, res: Response) => {
      res.sendFile(_path.resolve(__dirname, './../../dist/index.html'));
    };

    app.use(
      (req: Request, res: Response, next: NextFunction) => {
        res.tpl = {};

        res.tpl.user = null;
        if (req.session.user) {
          let user = Utils.clone(req.session.user);
          delete user.password;
          res.tpl.user = user;
        }
        res.tpl.clientConfig = Config.Client;

        return next();
      });

    app.get('/config_inject.js', (req: Request, res: Response) => {
      res.render(_path.resolve(__dirname, './../../dist/config_inject.ejs'), res.tpl);
    });
    app.get(['/', '/login', "/gallery*", "/share*", "/admin", "/search*"],
      AuthenticationMWs.tryAuthenticate,
      renderIndex
    );

    app.use(_express.static(ProjectPath.FrontendFolder));
    app.use('/node_modules', _express.static(_path.resolve(__dirname, './../../node_modules')));
    app.use('/common', _express.static(_path.resolve(__dirname, './../../common')));


  }

}
