(function (global) {
    if (global.PokiSDK) {
        return;
    }

    var noOp = function () {};
    var resolved = function () {
        return Promise.resolve();
    };

    global.PokiSDK = {
        init: resolved,
        setDebug: noOp,
        commercialBreak: resolved,
        gameplayStart: noOp,
        gameplayStop: noOp,
        rewardedBreak: resolved,
        gameLoadingStart: noOp,
        gameLoadingFinished: noOp,
        gameLoadingProgress: noOp,
        happyTime: noOp
    };
}(window));
