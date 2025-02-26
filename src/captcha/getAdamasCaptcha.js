import axios from "axios";

//
//
// Пример работы с каптчами.
//
//

/**
 * Получение ответа от Google reCAPTCHA.
 * 
 * @param {Object} params - Параметры для запроса.
 * @param {string} params.k - Публичный ключ.
 * @param {string} params.v - Версия капчи.
 * @param {string} params.c - Challenge (ответ капчи).
 * @param {string} params.t - Время/параметр t.
 * @param {string} params.ct - Дополнительный параметр.
 * @param {string} params.bg - Дополнительные данные.
 * @returns {Promise<any>} - Ответ от сервера reCAPTCHA.
 */
export async function getRecaptchaResponse({ k, v, c, t, ct, bg } = {
  k: "6LdBQhobAAAAAOvU7Iwm0gNAR3Owtru9C8eQ_K7J",
  v: "rW64dpMGAGrjU7JJQr9xxPl8",
  c: "03AFcWeA7apPbyaQq4I9pK6ZDeVx3-OYpPP7LxUO1O-di6laKP2BYfMjKVTvfa5gqFhqK8Xn5J_5rR00_IJBMGmf-i461d9lOFoqMJygYFgXhWRGo2kR3QiDP1_hSyBwnp-R0KwM7JilOzADbx-MzmYcqDpfjdcnNLULv8BsI7ZJUjFhamZYETqBQzEzjPHJNsFc-h2gtY7SxT4GMtqOs46Sp33vLmY3m29ZBWhf7cxSzIADOTEAepTcikb97Neew4Oy0y57Fljrnw64eV8wI8RD7ofWUKKUfnfjSVEDwj56TAVMQahZAWWCff6YINVBaH1s-FOyBJc-3JClCpjys7vTa78_kFvKexlQ3UszWdMnCbdJ7_Tcm1RHmfxG6VfOUw78db6N89lSKe4Mjs_o8i4ZzSsl7BYPO68RPUHRiHe9f16pYcfZwIHXNyktLoICm80euc4u6AXk1F9SJ-LLOBH-lE6LVWM-q7uJ0KB_Cz2CfgTbxYjE9XrDvh793ODYV6Ig4-PddL9KDLGDQ7AWSQdpdmS1wCHrZIBp9FEqU3jlFh9ybs-WdbUeQ6wU1eL3ZcEXDNrT2hS2dVxg-w15bNP71AOljjp9SzL0U2oAA5uDlxfEIOKrmHlvLMf8b1JqCt7q3SN-kUt1yuFLvggz_lNnwS0VmcD1QfiwWnCA1d15uA-UOoGCccV6JckqTqJPbOw2IUY2fTqyp_JvK_fL3HTfGpp-_DHxX0bKJvMMDsvXlGkQwWesDf4K3SAcX8G-93MebpimB2STlvlLxTrF_sq5vyB_KGbtBcUUpMeSH-DI67P3sWmNB9IdXEaQbScPVDf7yYdzgmyD6X5aa0c6aNghHRg9b7pcfh44rbRV6-BQ-Xd4UdibxiFx7A57o9CaRJG_NeW_CO3pNycyJJKYNI0mcyJAk5qZPhRTKXRmupot3lv6mX1t6deJiMFwh4Aba7CHnL7svTujJ8A4jsSHWqHDyzQziNhYdN98oHcrTTf09GvG3LBXjHJd48-iAbL3spfDYXsXtyK2l8rx3BYyzN0jJtfGuBGMIifZEJFbcA5sUY-jXkl5frN-e45-zS3E4RRqFngyC65djjRitrHMNeJ4b8R4TIkOVzY4nbB125rL8kXpXaDdSL4E8cBf-h6kf6nt2eZ2AaLFWO6Cbl4okdZu08jOBLh9EjmFGwd2X9yfwHMCvIgCOi9xyCFRqb2RmOfRoz1xITtWUgL7n_dKLL2V6PSGmMASiTUfIcXP5DNPB72e3vnrVb7ShYb_sbDX4AfXcTh8CQT3b7vhocb3JR0HSz-ADpW6XU9AX31xdeCafJMHnZZokASFaghjUG76SME12baDMQPgODd53wrmF-MP_hpHB475oBDHoMddgYInkt_kEh5ScOkFxWxgaerGQG_FZCkVkyN_Vc5q2Jv5SALVNHmQj84SZZ4MzR5NIm03J-FLulq4xcsQLVKBxP128M25YSVks5uJXGur7Va2E26vts71bHCtI-b_VSgJxiJZpCx7wgXvvOLTs8NFtvb6SDOZ9LSJoo78kTbNjxTN3wcOuH0ROqQ-l96A5lS9zeZF_GaL2RWa5qL6F3U5xlem18Wi4-HhJ6BAChnziGq_T7-0nBWI5RI3k9O_cy98EVbNnnqagx0xxUKZWOulg3CxEGeOzPxu6X8NDgwJXCYwCJly4wTEKk6XF3KbgxaXh4uaG3dpc27VFWr4hL3PPqKIDziYV5Dg2byM55DhK-Y7Ffwj6hDrav1n4LZ_tGDHjuwEklwFdkzQa5aFx_OsWmqsWmPca4z_6HG7BkjEfRkfg0ai_MslYkgdfpCaBGYETwCx70ZCQ2YFfRzC6zIXosD5yeAz02KJqDaWo76t1-fO1qzAPwPN0qvEKUigLEgdTPR3QhQc89A1gjLXUDBvK3ZO47xZdswc9pIR7zzezTfbP4kL71Phq2gp79j9Yy_1hk2Wk5G7nY6dRhTZfb8lqVWSfT7xVjyz2WZWIu0KSps9xdQEoD76oyFp4VW08wdV9oxFh7_qhqibM2qLjLhprK3-Hhz-S1-CPAkG5W4Wfb1tLDofc5enRIh3W88jXApJ7JvGltt9PRiCXRlOzmrYmDPfGSwe332yAK9gruxmHPVgdXIGdiU3uMCljCZM51vSGZTTfuhlRa-AlYemk80ppx6reX6VFQ6JcQFOh_Y-H1SvCoOIYbvRs0Kw0RIXVzy9CKjuXd5aqjbMtC9BSfpo0PTXtAoohTs6ZY6PzAE4kWNqB6czW6qODTUhMMoMvaSX_ijBmCySixgYsWecaZ-aInTy7FejMeKcZL7Zfp0u_U1hLlbCi2TN3ea_-Csp5BiiOi6cc2-moeInnKlSiu8UwatSAhnT6C8ZO4RX9bzdqP3D20BcALvp0-8B2jqFiIlpau_5YNKnrjqZYL15oCFg0mSJ87sMuKCgPe_qR_tF8Avr9P6lY-ZmT0LbB75TFg_KU422R2S7O-xRFp6jnwMTd2j1rOrRfgCqp4uK3sC5AmGVsEqP40jFWVSbyqju_c4w1BFOtF7VsMr9ZL_wEYapCn6cqkY3N4H_rpXHW5IjuJEzoCiCF8reCLAkewcuuyB9apbDfrYu5S2bBoDg8iepK8NjUdKDM07t--ajtPrL14d3kMc4ATZRGWln1LgPi7VpyPdfvlBh-hDewk8beBksON8vuVgR6SA80M8uO8PLrtkpOM8YOueUo6bq-3WrhCGl_ZNQSizOtRpLyV-Rcn0fl9S9trn9sVcnc1MnX_s1-rrlLc1Iag0-zT4O3NpTA7-ilinVGXt4lbOsgS7Mx92xgNgjNt6VCI25Dli4vEyduJNr--AlyzatbbP43I3vKVKKCqH_vazd3sLYjKHDdaGX97fe41w5Ic5k3WI5vmw71HRm9UyzAShbhMIhNlOq_6j-B6iiZi4L5GCorUtOYN3WgD0ftfhjYl61-FlQ33h8NAM-Rwy3Sv5UGiSs5d6_NS-vHJSQpI-tn4JChrcfgwabrxtHj5blcuDxLXJgxGmi61VL5AFPYPal1qivzGxruZAnfKFAbyNymM6ouzxQ96W5veE8doa9Jz2Q5qjcNvY2a91PYcxJpkYKh_-AZ-ahKH2Vx3tlQ_Gq4uxQMdSzFGeV73cAQ3EX3sIAqrmNRoRVk0-Ms6-NF4Z49bFy3w8CxWGz8p73jgYCXJkykmuAjou2Dkyey3xSM1r-KaS29ndBNUzr4nmeUgDHtO7_A2GQdxqBv53s2AK6oqWWeVRhFuDz9_N8UaO0sQRUlvqlfwGXJmGcV38osGWm16hjvSIgoVhk6pab7tpqrP-GPOPE04wIKnpKqxg5x3fVTHpOZpVP9L4Ja6yyTLffEpVsuP6dCTAaOLK1bpvYTHgi7UwwXA3t9lSt0Mg6XPrB3CzZCkTaGztyo2L7009Spju76UMnx7GqxZ47dROz4bluRLOVHlf_HAw5QCdzVG8_RyAckjBVVgqwGzbzDaQOmhRGd421HMk2c6Ynfwnrc2EMdEQPma0Rr1ysiAL-JfonXb5vv2EZ6QNziKWaPhiaUfLwtb1253WjhKjT-RxdF0QDCI_G_UmZHivMx7eruEIH6j4hd0aU8QIvhBnyRZBsPkHRnQBwcJVN9mnmRkIFpuM1Da_pUMsNdmG8sSb4-s7dLSSBaNtKXw8JDZpG8OKOQOYQPSRRy0RMKy6mvTmA1HqNxN1GLGuYXQoO9dB7KMC2plGrvdlbvxWiTGNUrSsjmnurk6NbJ6rSXYz6d0VqmFnZvhbIAqhWNcHXk9-aUighkqSmW5G1ijNI9BKANlPQyzzjUQ3kgeE-lCT0n9AVf3Lq3K32ySthdx_FHUNoib4GpyMqWkJf3d0t2i6RMf9DxO9R7U31OiLW8hFtTrE3-YxL-T052qQ82i3CGXhvrGnUZ6dO7OTz_wiZPM7xANTBSBzDQcZt_4Hwb7VRLmAyQh6pJqs3zeYAazNFiRuXWTawxLZzbix0-dwF04wCpg16-vR4ZgUYn05bCqwTDSoa0i9hRPV7I9jcn_h3r5KA3j76hjWXkVzeW3GPooULyEMiT2tXF_wXqHs1JQoLZW2p7ZgJ0XXuRg32t-cIXYTkLqTgfcT-J7A5ilroo-rtxNYwET_PXKgO1ffX-PQe7keEdhE8fZvuOwAvQu99dFrs4fLNTZ8OwXDZaMM3XnB6hPLCD0g3qB-dL_8MrMVfbfkUvYL_VdiVTCxqOHJRY71RGEIi0rIhsWGruUa8JfmCc7i-p07NTsPoOdb3Rm43T8_giM5nY3PdPaTaXRh-cGTC4_2rSoBVOuHczMY2tyTnjnBz05mY3SVtxGw4_OVz8OXZOniibShVSm-PPKWD-AnSfRD3GWRA3y-cyEquQgk8LmkvLJngBT9YmGuyBLLDYoTtXYYC16DArdKHuEMuizIZ9vbM_C6llMVfI-X8UtZXtUzvgNbGig5Lc-3epEpVRI0Cfk7N69_SclyNXcOYFvKUehb03WP0msHAXOx2KPsYeDsZGAtSrOElvCWArgILDr-cMltXRSyg8Qz-yUXiXVkbH7pYA84r9W6Cv-4moUfr-il5ce-AjZfx5mlsBVyPbUWqCdwbLrpqvEmddiWPXch_kVWQ853jppQJwMa_nKDslwYLx36NcHZzT9xDtUNtOlXku_Fwh5izYYWL2dxhrRkfsqYHCESrsHZukT0u9-LkPIroucZWvMeQMmI-4PSFDJ5I8tFs7CmTahYSQAI5vXC25FNWUPoLEdcYbB6265N77U8qEYzVMz7EtRLMIBMARj-UgFIzZ9eXcyyKYP0fSpKI3liDOimk1OyMp0x_pcqioSLpak1yO6Jfaok5qBtKIdWOP1doQtokursAJZk5r8_C6xTl2TUW9L1PtEoT7b1-d2ZptF3JWcIo6lGSPuf8gW51Laepm6Z0zx5pYmMs2uu50uAFr9rtrezt27Odm3xxpegcwZ7pdxjqGr5B5j1wu6wXfVm-2e1Szfoe8PlXHxY_q7Midd-GD_SFcZ6O3pnf1R32XKFl-Q4aTbF9tRqXO0bz99QvSM6KG6V55f3EHPftcAU61yn3NGqEztFTr-Y8FPYV2nfIzd5SP0GtIYsyFk_C2VvejrMHT13-nePqePc1qBih9NvUhHlG1objX5Uc4z-V_pFVRmMCSqYJh9NaCUnC1FypxvvLxW-dM8RhE8KHDrNVOBiqkZ3mEoRu6-ZT9plECAD9WtcedjH6ebIIRzco5QymToLXrt8kNtfhhBB-bvSgQnkEO4UEwD2NCC81bOjxUDIRSJAGaZZoIkZt_AcaIe8v6kyFZYZOX3i6aOqUCKZCdwM70KnZDszKqOVIwMS87rxgOahQh8IUhz0_SlYMVAlbwoABtbgbwZSJdC9iyMLaY5prE-6y5bTKrUO_ZbsM3LxF2BauzNZTVF-QDQVK0w6dxQJQPq9pLre-msSXgO5csOjAXI35GN1Pi9TSSQRIbC0vYjiOdaVdy1JBNpsPHTQ8hcpZUfa9rPsKFsGyQ0LfZgMIuyx0uGtKHBQ4g1lpbfmqX16A8J3IgEFtbMwLrngZKE7CN08l4HwHZuGbScIJ0BNzqG_eYbhlmYWGVA3YmyMOS_58cHS125FTQc29y15M5anNYdPbBZMl7D-JEeC1EJ9lfWvegjT65RmDHb16HO4KmP9Mw1C20ekiEq-5Zu8Z9PJdiSu446mkhuPtf3neqSX1YZ_NVNKlT0p18wWVV1omJmyy2p23dvbHotti5tQRSzI-JLwHcCmsEn4pRqHe0u07IBMW6O-O9tVK-t2oDZHdhljRkWan2SUVTyo2voVC5Zx8yPhE5YC0EzbiedRIiHa-JZ",
  t: "10139",
  ct: "10139"
}) {
  const url = `https://www.google.com/recaptcha/api2/userverify?k=${encodeURIComponent(k)}`;

  const payload = new URLSearchParams();
  payload.append("v", v);
  payload.append("c", c);
  payload.append("t", t);
  payload.append("ct", ct);
  payload.append("bg", bg);

  try {
    const response = await axios.post(url, payload.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Origin": "https://www.google.com",
        "Referer": "https://www.google.com/recaptcha/api2/bframe"
      },
      timeout: 10000
    });
    return response.data;
  } catch (error) {
    throw new Error(`Ошибка при получении капчи: ${error.message}`);
  }
};
