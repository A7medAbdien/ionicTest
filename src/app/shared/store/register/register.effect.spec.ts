import { Observable, of, throwError } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { Action, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing"
import { AuthService } from "src/app/services/auth/auth.service";
import { RegisterEffects } from "./register.effect";
import { register, registerFail, registerSuccess } from "./register.actions";
import { UserRegister } from "../../model/user/UserRegister";

describe('Register effects', () => {

  let effects: RegisterEffects;
  let actions$: Observable<Action>;
  let error = { error: 'error' }

  let authServiceMock = {
    register: (userRegister: UserRegister) => {
      if (userRegister.email == "error@gmail.com") {
        return throwError(() => error)
      }
      return of({})
    },
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([
          RegisterEffects
        ])
      ],
      providers: [
        provideMockActions(() => actions$)
      ]
    }).overrideProvider(AuthService, { useValue: authServiceMock })

    effects = TestBed.inject(RegisterEffects);
  })

  it('should register return success', (done) => {
    actions$ = of(register({ userRegister: new UserRegister() }));

    effects.register$.subscribe((newAction) => {
      expect(newAction).toEqual(registerSuccess());
      done();
    })
  })

  it('should register return error', (done) => {
    const userRegister = new UserRegister();
    userRegister.email = "error@gmail.com";
    actions$ = of(register({ userRegister: userRegister }));

    effects.register$.subscribe((newAction) => {
      expect(newAction).toEqual(registerFail({ error }));
      done();
    })
  })

})
