// shared/platform.js — Platform/distribution configuration
// Set window.GAME_MARKET before this file loads to override (e.g. from a build script).
// Valid markets: "itchio" | "newgrounds" | "galaxy" | "googleplay" | "crazygames"

window.GAME_MARKET = window.GAME_MARKET || "newgrounds";

window.PLATFORM = (() => {
    const market = window.GAME_MARKET;

    // ── Badge colours for leaderboard rows ──────────────────────────────────
    const _colors = {
        itchio:        '#fa5c5c',
        newgrounds:    '#fda238',
        galaxy:        '#0099cc',
        incrementaldb: '#00bcd4',
        googleplay:    '#34a853',
        crazygames:    '#9b3de8',
    };

    // ── Display names for market badges ─────────────────────────────────────
    const _labels = {
        itchio:        'ITCH.IO',
        newgrounds:    'NEWGROUNDS',
        galaxy:        'GALAXY',
        incrementaldb: 'INCREMENTAL DB',
        googleplay:    'GOOGLE PLAY',
        crazygames:    'CRAZYGAMES',
    };

    // ── Speedrun leaderboard API ─────────────────────────────────────────────
    const rankingApiUrl = 'https://themachinegg.com/server';

    // ── Steam wishlist — shown on non-Steam storefronts ──────────────────────
    // crazygames incluido a propósito: el botón del menú principal (#mm-steam-btn)
    // ya enlazaba a Steam allí con la URL hardcodeada, así que excluirlo aquí solo
    // conseguía que el botón del cartel final se ocultara mientras el del menú sí
    // salía. Ahora los dos son coherentes.
    const _steamMarkets = ['itchio', 'galaxy', 'newgrounds', 'googleplay', 'crazygames'];
    const steamUrl = _steamMarkets.includes(market)
        ? `https://store.steampowered.com/app/4563810/The_MachinEGG/?utm_source=G1_${market.toUpperCase()}`
        : null;

    // ── "Rate us" link after speedrun ending (itch.io only) ──────────────────
    const showRateLink = market === 'itchio';

    // ── Community dropdown options for speedrun submission ───────────────────
    // itch.io players can also submit to IncrementalDB
    const communityOptions = market === 'itchio'
        ? [{ value: 'itchio', label: 'itch.io' }, { value: 'incrementaldb', label: 'IncrementalDB' }]
        : [{ value: market, label: _labels[market] || market }];

    // ── SDK hooks (override per platform in dist builds) ─────────────────────
    // e.g. CrazyGames SDK, AdMob, etc.
    function initSdk() { /* no-op in local/web build */ }
    function requestAd(onReward) { onReward(); } // override in dist if needed

    return {
        market,
        rankingApiUrl,
        steamUrl,
        showRateLink,
        communityOptions,
        initSdk,
        requestAd,
        marketColor: (m) => _colors[m] || '#888',
        marketLabel: (m) => _labels[m] || m,
    };
})();
