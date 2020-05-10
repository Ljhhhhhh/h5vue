import Vue from "vue";
import Router from "vue-router";
import Home from "views/Home.vue";
import { AppModule } from "@/store/modules/app";

Vue.use(Router);

let routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "首页",
      keepAlive: true
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import(/* webpackChunkName: "404" */ "views/404.vue"),
    meta: {
      title: "404",
      keepAlive: true
    }
  }
];

const routerContext = require.context("./", true, /\.ts$/);
routerContext.keys().forEach((route: string) => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith("./index")) {
    return;
  }
  const routerModule = routerContext(route);
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = routes.concat(routerModule.default || routerModule);
});

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    base: process.env.BASE_URL,
    // scrollBehavior: () => ({ y: 0 }),
    routes
  });

const myRouter = createRouter();

const history = window.sessionStorage;
history.clear();
let historyCount = Number(history.getItem("count")) || 0;
history.setItem("/", 0 + "");

myRouter.beforeEach((to, from, next) => {
  if (to.params.direction) {
    AppModule.updateDirection(to.params.direction);
  } else {
    const toIndex = history.getItem(to.path);
    const fromIndex = history.getItem(from.path);
    // 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
    if (toIndex) {
      if (
        !fromIndex ||
        parseInt(toIndex, 10) > parseInt(fromIndex, 10) ||
        (toIndex === "0" && fromIndex === "0")
      ) {
        AppModule.updateDirection("forward");
      } else {
        AppModule.updateDirection("back");
      }
    } else {
      ++historyCount;
      history.setItem("count", historyCount + "");
      to.path !== "/" && history.setItem(to.path, historyCount + "");
      AppModule.updateDirection("forward");
    }
  }
  next();
});

export function resetRouter() {
  myRouter.replace("/login");
}

export default myRouter;
