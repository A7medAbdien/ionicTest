import { UserRegister } from "../../model/user/UserRegister"
import { AppInitialState } from "../AppInitialState"
import { register, registerFail, registerSuccess } from "./register.actions"
import { registerReducer } from "./register.reducer"

describe('Register Store', () => {
  it('register', () => {
    const initialState = { ...AppInitialState.register };
    const newState = registerReducer(initialState, register({ user: new UserRegister() }));

    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRegistered: false,
      isRegistering: true
    })
  })

  it('registerSuccess', () => {
    const initialState =
    {
      ...AppInitialState.register,
      isRegistering: true
    };
    const newState = registerReducer(initialState, registerSuccess());

    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRegistered: true,
      isRegistering: false
    })
  })

  it('registerFail', () => {
    const initialState = AppInitialState.register;
    const error = { error: 'anyError' };
    const newState = registerReducer(initialState, registerFail({ error }));

    expect(newState).toEqual({
      ...initialState,
      error: error,
      isRegistered: false,
      isRegistering: false
    })

  })
})
