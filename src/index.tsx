import * as React from "react";
import * as ReactDom from "react-dom";

import { MainComponent } from "./app/pages/main/Main.component";
import {LoginComponent} from "./app/pages/login/Login.component";

ReactDom.render(<LoginComponent/>, document.getElementById("root"));
