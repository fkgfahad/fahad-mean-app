class State {
  constructor(private state: object) {}

  private stateChangeListener: any

  init() {
    this.stateChangeListener({...this.state})
  }

  setState(newState: object) {
    this.state = {...Object.assign(this.state, newState)}
  }

  removeState(keys: string | string[]) {
    if (typeof keys === 'string') {
      delete this.state[keys]
    } else {
      for (const key of keys) {
        delete this.state[key]
      }
    }
    this.stateChangeListener({...this.state})
  }

  eraseState() {
    this.stateChangeListener({})
  }

  subscribe(callback: any) {
    return this.stateChangeListener = (state: object) => {
      return callback(state)
    }
  }
}
