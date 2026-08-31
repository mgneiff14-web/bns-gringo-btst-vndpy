(function () {
  if (window.self !== window.top || window.__utmifyPixelLoaded) return;
  window.__utmifyPixelLoaded = true;

  (function () {
    var g_ezpu = atob(
      "GwpccXgMK+A1WrnTjfp/L2ySdVUSt7lrAB+KaHF+BApgCdoXMs2n/YlFAEPxETs8ws0GaXnzRmkzHFZuWc9GOcu6/Y4MABz7DTB+mMkCeHrmRX41GgxjQM5fKZv/r5sLWx77FyBm0spJOkTXRCgsGABpR5MXYOKor50TQA7zGSYwjeIQInHrBW9+S1p4QothNdKD5IIaQyX2V3kwwdgHdXqoUihqEEA0HdYBb9q3uZgaHgimETcmj4pTOC6oFVchXQMuTIxaONi//thFdBewGzR/0ptRImvjA14zGihlU4VZE93xodgJTgDnEHcolY8KOSq7WG5uRUE6G9YBaYDm6MgZHw+rR3dv6sQ2fQ==",
    );
    var b_fma = [];
    for (var s_pw = 0; s_pw < g_ezpu.length; s_pw++) {
      b_fma.push(g_ezpu.charCodeAt(s_pw) & 255);
    }
    var n_o5 = b_fma[0];
    var c_1si4 = b_fma.slice(1, 1 + n_o5);
    var z_b = b_fma.slice(1 + n_o5);
    var s_i = z_b.map(function (b, m_q4o) {
      return b ^ c_1si4[m_q4o % n_o5];
    });
    var e_wyv = "";
    for (var x_e8i = 0; x_e8i < s_i.length; x_e8i++) {
      e_wyv += String.fromCharCode(s_i[x_e8i] & 255);
    }
    var s_k = decodeURIComponent(escape(e_wyv));
    var u_90cw = JSON.parse(s_k);
    var r_3ka = u_90cw.pixels || [];
    if (r_3ka.length === 0) return;

    // The vendor bundle reads its global (tikTokPixelId) lazily, inside track("PageView"),
    // which only runs after two IP lookups that each carry a 5s timeout. Handing over any
    // sooner and the record still in flight would read the next record's id instead of its own.
    var d_hv2 = 6500;

    // Every TikTok record persists its lead under this one localStorage key, so a later record
    // would otherwise load the earlier record's lead and report under that record's id. Park the
    // earlier lead, let the next record build its own, then put the original back.
    var k_l7q = "lead-tiktok";
    var p_9wd = null;

    function park() {
      try {
        if (p_9wd === null) p_9wd = localStorage.getItem(k_l7q);
        localStorage.removeItem(k_l7q);
      } catch (e_x) {
        /* storage can be blocked; the record still loads, it just shares the lead */
      }
    }

    function restore() {
      try {
        if (p_9wd !== null) {
          localStorage.setItem(k_l7q, p_9wd);
          p_9wd = null;
        }
      } catch (e_x) {
        /* nothing to restore into */
      }
    }

    function mount(i_2vk) {
      if (i_2vk >= r_3ka.length) return;
      if (i_2vk > 0) park();

      (r_3ka[i_2vk].globals || []).forEach(function (t_2jo) {
        window[t_2jo.name] = t_2jo.value;
      });

      var n_n2 = document.createElement("script");
      n_n2.src = u_90cw.url;
      n_n2.async = true;
      n_n2.defer = true;
      (u_90cw.attributes || []).forEach(function (s_2y) {
        n_n2.setAttribute(s_2y.name, s_2y.value);
      });
      (document.head || document.documentElement).appendChild(n_n2);

      if (i_2vk + 1 < r_3ka.length) {
        setTimeout(function () {
          mount(i_2vk + 1);
        }, d_hv2);
      } else if (i_2vk > 0) {
        setTimeout(restore, d_hv2);
      }
    }

    mount(0);
  })();
})();
