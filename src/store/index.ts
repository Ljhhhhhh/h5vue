import createLoadingPlugin from "@/utils/vuex-loading";
import Vue from "vue";
import Vuex from "vuex";
import { IAppState } from './modules/app'
import { IUserState } from "./modules/user";
import { INumberState } from "./modules/test";

Vue.use(Vuex);

export interface IRootState{
  user: IUserState;
  number: INumberState;
  app: IAppState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({
  plugins: [createLoadingPlugin()],
});
