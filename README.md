# Silent Failure of Expo Camera's takePictureAsync

This repository demonstrates a bug in Expo's Camera API where `takePictureAsync` can fail silently if called before the camera is fully initialized. The bug manifests as a lack of error messages when `takePictureAsync` is called too early. No image is captured, and the Promise resolves without providing any indication of failure.

## Bug Reproduction

1. Clone the repository.
2. Run `npm install`.
3. Run `expo start`.
4. Attempt to take a picture immediately after the app launches. The button press will appear to do nothing; no image will be captured.

## Solution

The solution involves ensuring `takePictureAsync` is only called after the camera has finished loading. This is typically done by checking a `status` property within the `Camera` component's state or by using an appropriate lifecycle method like `onCameraReady`.