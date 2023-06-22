export const initialState = {
  isRecording: false,
};

export const ACTIONS = {
  RECORDING: 'recording',
  STOP_RECORDING: 'stop_recording',
};

export function reducer(state: any, action: any): any {
  switch (action.type) {
    case ACTIONS.RECORDING:
      return { isRecording: true };
    case ACTIONS.STOP_RECORDING:
      return { isRecording: false };
    default:
      return state;
  }
}
