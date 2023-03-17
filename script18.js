(() => {
    var Qd = Object.defineProperty;
    var i = (D, k) => Qd(D, "name", {
        value: k,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [1436], {
            16861: (D, k, u) => {
                "use strict";
                var S = u(77691);
                const A = i((t, e, n) => {
                        if (!(0, S.CD)(t, e)) return -1 / 0;
                        const o = (0, S.Gs)(t, e);
                        return o < n ? -1 / 0 : o
                    }, "getScore"),
                    N = i((t, e, n) => {
                        t.innerHTML = "";
                        let o = 0;
                        for (const s of (0, S.m7)(e, n)) {
                            n.slice(o, s) !== "" && t.appendChild(document.createTextNode(n.slice(o, s))), o = s + 1;
                            const a = document.createElement("mark");
                            a.textContent = n[s], t.appendChild(a)
                        }
                        t.appendChild(document.createTextNode(n.slice(o)))
                    }, "highlightElement"),
                    M = new WeakMap,
                    b = new WeakMap,
                    m = new WeakMap,
                    h = i(t => {
                        if (!m.has(t) && t instanceof HTMLElement) {
                            const e = (t.getAttribute("data-value") || t.textContent || "").trim();
                            return m.set(t, e), e
                        }
                        return m.get(t) || ""
                    }, "getTextCache");
                class g extends HTMLElement {
                    connectedCallback() {
                        const e = this.querySelector("ul");
                        if (!e) return;
                        const n = new Set(e.querySelectorAll("li")),
                            o = this.querySelector("input");
                        o instanceof HTMLInputElement && o.addEventListener("input", () => {
                            this.value = o.value
                        });
                        const s = new MutationObserver(a => {
                            let c = !1;
                            for (const l of a)
                                if (l.type === "childList" && l.addedNodes.length) {
                                    for (const f of l.addedNodes)
                                        if (f instanceof HTMLLIElement && !n.has(f)) {
                                            const p = h(f);
                                            c = c || (0, S.CD)(this.value, p), n.add(f)
                                        }
                                } c && this.sort()
                        });
                        s.observe(e, {
                            childList: !0
                        });
                        const r = {
                            handler: s,
                            items: n,
                            lazyItems: new Map,
                            timer: null
                        };
                        b.set(this, r)
                    }
                    disconnectedCallback() {
                        const e = b.get(this);
                        e && (e.handler.disconnect(), b.delete(this))
                    }
                    addLazyItems(e, n) {
                        const o = b.get(this);
                        if (!o) return;
                        const {
                            lazyItems: s
                        } = o, {
                            value: r
                        } = this;
                        let a = !1;
                        for (const c of e) s.set(c, n), a = a || Boolean(r) && (0, S.CD)(r, c);
                        a && this.sort()
                    }
                    sort() {
                        const e = M.get(this);
                        e && (e.aborted = !0);
                        const n = {
                            aborted: !1
                        };
                        M.set(this, n);
                        const {
                            minScore: o,
                            markSelector: s,
                            maxMatches: r,
                            value: a
                        } = this, c = b.get(this);
                        if (!c || !this.dispatchEvent(new CustomEvent("fuzzy-list-will-sort", {
                                cancelable: !0,
                                detail: a
                            }))) return;
                        const {
                            items: l,
                            lazyItems: f
                        } = c, p = this.hasAttribute("mark-selector"), E = this.querySelector("ul");
                        if (!E) return;
                        const L = [];
                        if (a) {
                            for (const T of l) {
                                const B = h(T),
                                    _ = A(a, B, o);
                                _ !== -1 / 0 && L.push({
                                    item: T,
                                    score: _
                                })
                            }
                            for (const [T, B] of f) {
                                const _ = A(a, T, o);
                                _ !== -1 / 0 && L.push({
                                    text: T,
                                    render: B,
                                    score: _
                                })
                            }
                            L.sort((T, B) => B.score - T.score).splice(r)
                        } else {
                            let T = L.length;
                            for (const B of l) {
                                if (T >= r) break;
                                L.push({
                                    item: B,
                                    score: 1
                                }), T += 1
                            }
                            for (const [B, _] of f) {
                                if (T >= r) break;
                                L.push({
                                    text: B,
                                    render: _,
                                    score: 1
                                }), T += 1
                            }
                        }
                        requestAnimationFrame(() => {
                            if (n.aborted) return;
                            const T = E.querySelector('input[type="radio"]:checked');
                            E.innerHTML = "";
                            let B = 0;
                            const _ = i(() => {
                                if (n.aborted) return;
                                const Z = Math.min(L.length, B + 100),
                                    Q = document.createDocumentFragment();
                                for (let U = B; U < Z; U += 1) {
                                    const F = L[U];
                                    let et = null;
                                    if ("render" in F && "text" in F) {
                                        const {
                                            render: yt,
                                            text: _t
                                        } = F;
                                        et = yt(_t), l.add(et), m.set(et, _t), f.delete(_t)
                                    } else "item" in F && (et = F.item);
                                    et instanceof HTMLElement && (p && N(s && et.querySelector(s) || et, p ? a : "", h(et)), Q.appendChild(et))
                                }
                                B = Z;
                                let z = !1;
                                if (T instanceof HTMLInputElement)
                                    for (const U of Q.querySelectorAll('input[type="radio"]:checked')) U instanceof HTMLInputElement && U.value !== T.value && (U.checked = !1, z = !0);
                                if (E.appendChild(Q), T && z && T.dispatchEvent(new Event("change", {
                                        bubbles: !0
                                    })), Z < L.length) requestAnimationFrame(_);
                                else {
                                    E.hidden = L.length === 0;
                                    const U = this.querySelector("[data-fuzzy-list-show-on-empty]");
                                    U && (U.hidden = L.length > 0), this.dispatchEvent(new CustomEvent("fuzzy-list-sorted", {
                                        detail: L.length
                                    }))
                                }
                            }, "nextBatch");
                            _()
                        })
                    }
                    get value() {
                        return this.getAttribute("value") || ""
                    }
                    set value(e) {
                        this.setAttribute("value", e)
                    }
                    get markSelector() {
                        return this.getAttribute("mark-selector") || ""
                    }
                    set markSelector(e) {
                        e ? this.setAttribute("mark-selector", e) : this.removeAttribute("mark-selector")
                    }
                    get minScore() {
                        return Number(this.getAttribute("min-score") || 0)
                    }
                    set minScore(e) {
                        Number.isNaN(e) || this.setAttribute("min-score", String(e))
                    }
                    get maxMatches() {
                        return Number(this.getAttribute("max-matches") || 1 / 0)
                    }
                    set maxMatches(e) {
                        Number.isNaN(e) || this.setAttribute("max-matches", String(e))
                    }
                    static get observedAttributes() {
                        return ["value", "mark-selector", "min-score", "max-matches"]
                    }
                    attributeChangedCallback(e, n, o) {
                        if (n === o) return;
                        const s = b.get(this);
                        !s || (s.timer && window.clearTimeout(s.timer), s.timer = window.setTimeout(() => this.sort(), 100))
                    }
                }
                i(g, "FuzzyListElement");
                const w = g;
                window.customElements.get("fuzzy-list") || (window.FuzzyListElement = g, window.customElements.define("fuzzy-list", g));
                var C = i((t, e, n) => {
                        if (!e.has(t)) throw TypeError("Cannot " + n)
                    }, "__accessCheck"),
                    v = i((t, e, n) => (C(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "__privateGet"),
                    x = i((t, e, n) => {
                        if (e.has(t)) throw TypeError("Cannot add the same private member more than once");
                        e instanceof WeakSet ? e.add(t) : e.set(t, n)
                    }, "__privateAdd"),
                    I = i((t, e, n, o) => (C(t, e, "write to private field"), o ? o.call(t, n) : e.set(t, n), n), "__privateSet"),
                    O, $, nt, ot, mt, ht, ft;
                class At extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        x(this, O, !1), x(this, $, new Set), x(this, nt, new Map), x(this, ot, 1 / 0), x(this, mt, new Map), x(this, ht, new Map), x(this, ft, 0)
                    }
                    static get observedAttributes() {
                        return ["data-updating"]
                    }
                    get updating() {
                        return this.getAttribute("data-updating") === "lazy" ? "lazy" : "eager"
                    }
                    set updating(e) {
                        this.setAttribute("data-updating", e)
                    }
                    get size() {
                        return v(this, $).size
                    }
                    get range() {
                        const e = this.getBoundingClientRect().height,
                            {
                                scrollTop: n
                            } = this,
                            o = `${n}-${e}`;
                        if (v(this, mt).has(o)) return v(this, mt).get(o);
                        let s = 0,
                            r = 0,
                            a = 0,
                            c = 0;
                        const l = v(this, nt);
                        for (const f of v(this, $)) {
                            const p = l.get(f) || v(this, ot);
                            if (a + p < n) a += p, s += 1, r += 1;
                            else if (c - p < e) c += p, r += 1;
                            else if (c >= e) break
                        }
                        return [s, r]
                    }
                    attributeChangedCallback(e, n, o) {
                        if (n === o || !this.isConnected) return;
                        const s = e === "data-updating" && o === "eager",
                            r = e === "data-sorted" && this.hasAttribute("data-sorted");
                        (s || r) && this.update()
                    }
                    connectedCallback() {
                        this.addEventListener("scroll", () => this.update()), this.updateSync = this.updateSync.bind(this)
                    }
                    update() {
                        v(this, ft) && cancelAnimationFrame(v(this, ft)), !v(this, O) && this.hasAttribute("data-sorted") ? I(this, ft, requestAnimationFrame(() => {
                            this.dispatchEvent(new CustomEvent("virtual-list-sort", {
                                cancelable: !0
                            })) && this.sort()
                        })) : I(this, ft, requestAnimationFrame(this.updateSync))
                    }
                    renderItem(e) {
                        const n = {
                            item: e,
                            fragment: document.createDocumentFragment()
                        };
                        return this.dispatchEvent(new CustomEvent("virtual-list-render-item", {
                            detail: n
                        })), n.fragment.children[0]
                    }
                    recalculateHeights(e) {
                        const n = this.querySelector("ul, ol, tbody");
                        n && (n.append(this.renderItem(e)), I(this, ot, n.children[0].getBoundingClientRect().height), v(this, nt).set(e, v(this, ot)), n.replaceChildren())
                    }
                    updateSync() {
                        const e = this.querySelector("ul, ol");
                        if (!e) return;
                        const [n, o] = this.range;
                        if (o < n || !this.dispatchEvent(new CustomEvent("virtual-list-update", {
                                cancelable: !0
                            }))) return;
                        const r = new Map,
                            a = v(this, ht);
                        let c = -1,
                            l = !0,
                            f = 0;
                        for (const B of v(this, $)) {
                            if (c === -1 && (!Number.isFinite(v(this, ot)) || v(this, ot) === 0) && this.recalculateHeights(B), c += 1, c < n) {
                                f += v(this, nt).get(B) || v(this, ot);
                                continue
                            }
                            if (c > o) {
                                l = !1;
                                break
                            }
                            let _ = null;
                            if (a.has(B)) _ = a.get(B);
                            else {
                                if (_ = this.renderItem(B), !_) continue;
                                a.set(B, _)
                            }
                            r.set(B, _)
                        }
                        e.replaceChildren(...r.values()), e.style.paddingTop = `${f}px`;
                        const p = this.size * v(this, ot);
                        e.style.height = `${p||0}px`;
                        let E = !1;
                        const L = this.getBoundingClientRect().bottom;
                        for (const [B, _] of r) {
                            const {
                                height: Z,
                                bottom: Q
                            } = _.getBoundingClientRect();
                            E = E || Q >= L, v(this, nt).set(B, Z)
                        }
                        if (!l && this.size > r.size && !E) return v(this, mt).delete(`${this.scrollTop}-${this.getBoundingClientRect().height}`), this.update();
                        this.dispatchEvent(new CustomEvent("virtual-list-updated"))
                    }
                    has(e) {
                        return v(this, $).has(e)
                    }
                    add(e) {
                        return v(this, $).add(e), I(this, O, !1), Number.isFinite(v(this, ot)) || this.recalculateHeights(e), this.updating === "eager" && this.update(), this
                    }
                    delete(e) {
                        const n = v(this, $).delete(e);
                        return I(this, O, !1), v(this, nt).delete(e), this.updating === "eager" && this.update(), n
                    }
                    clear() {
                        v(this, $).clear(), v(this, nt).clear(), I(this, ot, 1 / 0), I(this, O, !0), this.updating === "eager" && this.update()
                    }
                    forEach(e, n) {
                        for (const o of this) e.call(n, o, o, this)
                    }
                    entries() {
                        return v(this, $).entries()
                    }
                    values() {
                        return v(this, $).values()
                    }
                    keys() {
                        return v(this, $).keys()
                    } [Symbol.iterator]() {
                        return v(this, $)[Symbol.iterator]()
                    }
                    sort(e) {
                        return I(this, $, new Set(Array.from(this).sort(e))), I(this, O, !0), this.updating === "eager" && this.update(), this
                    }
                }
                i(At, "VirtualListElement"), O = new WeakMap, $ = new WeakMap, nt = new WeakMap, ot = new WeakMap, mt = new WeakMap, ht = new WeakMap, ft = new WeakMap;
                const K = null;
                window.customElements.get("virtual-list") || (window.VirtualListElement = At, window.customElements.define("virtual-list", At));
                var G = i((t, e, n) => {
                        if (!e.has(t)) throw TypeError("Cannot " + n)
                    }, "virtual_filter_input_element_accessCheck"),
                    j = i((t, e, n) => (G(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "virtual_filter_input_element_privateGet"),
                    R = i((t, e, n) => {
                        if (e.has(t)) throw TypeError("Cannot add the same private member more than once");
                        e instanceof WeakSet ? e.add(t) : e.set(t, n)
                    }, "virtual_filter_input_element_privateAdd"),
                    H = i((t, e, n, o) => (G(t, e, "write to private field"), o ? o.call(t, n) : e.set(t, n), n), "virtual_filter_input_element_privateSet"),
                    W, Y, lt, vt, $t, it;

                function Gt(t) {
                    return Boolean(t instanceof Set || t && typeof t == "object" && "size" in t && "add" in t && "delete" in t && "clear" in t)
                }
                i(Gt, "isSetAlike");
                class An extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        R(this, W, void 0), R(this, Y, 0), R(this, lt, null), R(this, vt, void 0), R(this, $t, new Set), R(this, it, null), this.filter = (e, n) => String(e).includes(n)
                    }
                    static get observedAttributes() {
                        return ["src", "loading", "data-property", "aria-owns"]
                    }
                    get filtered() {
                        if (j(this, it)) return j(this, it);
                        if (this.hasAttribute("aria-owns")) {
                            const e = this.ownerDocument.getElementById(this.getAttribute("aria-owns") || "");
                            e && Gt(e) && H(this, it, e)
                        }
                        return j(this, it) || H(this, it, new Set)
                    }
                    set filtered(e) {
                        H(this, it, e)
                    }
                    get input() {
                        return this.querySelector("input, textarea")
                    }
                    get src() {
                        return this.getAttribute("src") || ""
                    }
                    set src(e) {
                        this.setAttribute("src", e)
                    }
                    get loading() {
                        return this.getAttribute("loading") === "lazy" ? "lazy" : "eager"
                    }
                    set loading(e) {
                        this.setAttribute("loading", e)
                    }
                    get accept() {
                        return this.getAttribute("accept") || ""
                    }
                    set accept(e) {
                        this.setAttribute("accept", e)
                    }
                    get property() {
                        return this.getAttribute("data-property") || ""
                    }
                    set property(e) {
                        this.setAttribute("data-property", e)
                    }
                    reset() {
                        this.filtered.clear(), H(this, $t, new Set)
                    }
                    clear() {
                        !this.input || (this.input.value = "", this.input.dispatchEvent(new Event("input")))
                    }
                    attributeChangedCallback(e, n, o) {
                        const s = this.isConnected && this.src,
                            r = this.loading === "eager",
                            a = e === "src" || e === "loading" || e === "accept" || e === "data-property",
                            c = e === "src" || e === "data-property",
                            l = n !== o;
                        c && l && (H(this, lt, null), j(this, vt) && clearTimeout(j(this, vt))), s && r && a && l ? (cancelAnimationFrame(j(this, Y)), H(this, Y, requestAnimationFrame(() => this.load()))) : e === "aria-owns" && H(this, it, null)
                    }
                    connectedCallback() {
                        this.src && this.loading === "eager" && (cancelAnimationFrame(j(this, Y)), H(this, Y, requestAnimationFrame(() => this.load())));
                        const e = this.input;
                        if (!e) return;
                        const n = this.getAttribute("aria-owns");
                        n !== null && this.attributeChangedCallback("aria-owns", "", n), e.setAttribute("autocomplete", "off"), e.setAttribute("spellcheck", "false"), this.src && this.loading === "lazy" && (document.activeElement === e ? this.load() : e.addEventListener("focus", () => {
                            this.load()
                        }, {
                            once: !0
                        })), e.addEventListener("input", this)
                    }
                    disconnectedCallback() {
                        var e;
                        (e = this.input) == null || e.removeEventListener("input", this)
                    }
                    handleEvent(e) {
                        var n, o;
                        e.type === "input" && (j(this, vt) && clearTimeout(j(this, vt)), H(this, vt, window.setTimeout(() => this.filterItems(), ((o = (n = this.input) == null ? void 0 : n.value) == null ? void 0 : o.length) || 0 < 3 ? 300 : 0)))
                    }
                    async load() {
                        var e;
                        (e = j(this, W)) == null || e.abort(), H(this, W, new AbortController);
                        const {
                            signal: n
                        } = j(this, W);
                        if (!this.src) throw new Error("missing src");
                        if (await new Promise(o => setTimeout(o, 0)), !n.aborted) {
                            this.dispatchEvent(new Event("loadstart"));
                            try {
                                const o = await this.fetch(this.request(), {
                                    signal: n
                                });
                                if (location.origin + this.src !== o.url) return;
                                if (!o.ok) throw new Error(`Failed to load resource: the server responded with a status of ${o.status}`);
                                H(this, $t, new Set((await o.json())[this.property])), H(this, lt, null), this.dispatchEvent(new Event("loadend"))
                            } catch (o) {
                                if (n.aborted) {
                                    this.dispatchEvent(new Event("loadend"));
                                    return
                                }
                                throw (async () => (this.dispatchEvent(new Event("error")), this.dispatchEvent(new Event("loadend"))))(), o
                            }
                            this.filtered.clear(), this.filterItems()
                        }
                    }
                    request() {
                        return new Request(this.src, {
                            method: "GET",
                            credentials: "same-origin",
                            headers: {
                                Accept: this.accept || "application/json"
                            }
                        })
                    }
                    fetch(e, n) {
                        return fetch(e, n)
                    }
                    filterItems() {
                        var e, n;
                        const o = (n = (e = this.input) == null ? void 0 : e.value.trim()) != null ? n : "",
                            s = j(this, lt);
                        if (H(this, lt, o), o === s) return;
                        this.dispatchEvent(new CustomEvent("virtual-filter-input-filter"));
                        let r;
                        s && o.includes(s) ? r = this.filtered : (r = j(this, $t), this.filtered.clear());
                        for (const a of r) this.filter(a, o) ? this.filtered.add(a) : this.filtered.delete(a);
                        this.dispatchEvent(new CustomEvent("virtual-filter-input-filtered"))
                    }
                }
                i(An, "VirtualFilterInputElement"), W = new WeakMap, Y = new WeakMap, lt = new WeakMap, vt = new WeakMap, $t = new WeakMap, it = new WeakMap;
                const tf = null;
                window.customElements.get("virtual-filter-input") || (window.VirtualFilterInputElement = An, window.customElements.define("virtual-filter-input", An));
                var Do = i((t, e, n) => {
                        if (!e.has(t)) throw TypeError("Cannot " + n)
                    }, "marked_text_element_accessCheck"),
                    Ft = i((t, e, n) => (Do(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "marked_text_element_privateGet"),
                    Pe = i((t, e, n) => {
                        if (e.has(t)) throw TypeError("Cannot add the same private member more than once");
                        e instanceof WeakSet ? e.add(t) : e.set(t, n)
                    }, "marked_text_element_privateAdd"),
                    Ie = i((t, e, n, o) => (Do(t, e, "write to private field"), o ? o.call(t, n) : e.set(t, n), n), "marked_text_element_privateSet"),
                    Re, De, Zt, ue;

                function yi(t, e) {
                    const n = [];
                    let o = 0;
                    for (let s = 0; s < t.length; s++) {
                        const r = t[s],
                            a = e.indexOf(r, o);
                        if (a === -1) return n;
                        o = a + 1, n.push(a)
                    }
                    return n
                }
                i(yi, "defaultPositions");
                class Ne extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        Pe(this, Re, ""), Pe(this, De, ""), Pe(this, Zt, void 0), Pe(this, ue, void 0)
                    }
                    get query() {
                        return this.ownerInput ? this.ownerInput.value : this.getAttribute("query") || ""
                    }
                    set query(e) {
                        this.setAttribute("query", e)
                    }
                    get ownerInput() {
                        const e = this.ownerDocument.getElementById(this.getAttribute("data-owner-input") || "");
                        return e instanceof HTMLInputElement ? e : null
                    }
                    connectedCallback() {
                        var e;
                        this.handleEvent(), (e = this.ownerInput) == null || e.addEventListener("input", this), Ie(this, Zt, new MutationObserver(() => this.handleEvent()))
                    }
                    handleEvent() {
                        Ft(this, ue) && cancelAnimationFrame(Ft(this, ue)), Ie(this, ue, requestAnimationFrame(() => this.mark()))
                    }
                    disconnectedCallback() {
                        var e;
                        (e = this.ownerInput) == null || e.removeEventListener("input", this), Ft(this, Zt).disconnect()
                    }
                    mark() {
                        const e = this.textContent || "",
                            n = this.query;
                        if (e === Ft(this, Re) && n === Ft(this, De)) return;
                        Ie(this, Re, e), Ie(this, De, n), Ft(this, Zt).disconnect();
                        let o = 0;
                        const s = document.createDocumentFragment();
                        for (const r of (this.positions || yi)(n, e)) {
                            if (Number(r) !== r || r < o || r > e.length) continue;
                            e.slice(o, r) !== "" && s.appendChild(document.createTextNode(e.slice(o, r))), o = r + 1;
                            const c = document.createElement("mark");
                            c.textContent = e[r], s.appendChild(c)
                        }
                        s.appendChild(document.createTextNode(e.slice(o))), this.replaceChildren(s), Ft(this, Zt).observe(this, {
                            attributes: !0,
                            childList: !0,
                            subtree: !0
                        })
                    }
                }
                i(Ne, "MarkedTextElement"), Re = new WeakMap, De = new WeakMap, Zt = new WeakMap, ue = new WeakMap, Ne.observedAttributes = ["query", "data-owner-input"];
                const ef = null;
                window.customElements.get("marked-text") || (window.MarkedTextElement = Ne, window.customElements.define("marked-text", Ne));
                var q = u(93673),
                    vi = Object.defineProperty,
                    wi = Object.getOwnPropertyDescriptor,
                    He = i((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? wi(e, n) : e, r = t.length - 1, a; r >= 0; r--)(a = t[r]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && vi(e, n, s), s
                    }, "__decorateClass");
                let de = i(class extends HTMLElement {
                    updateURL(t) {
                        const e = t.currentTarget,
                            n = e.getAttribute("data-url") || "";
                        if (this.helpField.value = n, e.matches(".js-git-protocol-clone-url"))
                            for (const o of this.helpTexts) o.textContent = n;
                        for (const o of this.cloneURLButtons) o.classList.remove("selected");
                        e.classList.add("selected")
                    }
                }, "GitCloneHelpElement");
                He([q.fA], de.prototype, "helpField", 2), He([q.GO], de.prototype, "helpTexts", 2), He([q.GO], de.prototype, "cloneURLButtons", 2), de = He([q.Ih], de);
                var Be = u(13977);
                class _e extends HTMLElement {
                    connectedCallback() {
                        this.addEventListener("input", No)
                    }
                    disconnectedCallback() {
                        this.removeEventListener("input", No)
                    }
                }
                i(_e, "PasswordStrengthElement"), window.customElements.get("password-strength") || (window.PasswordStrengthElement = _e, window.customElements.define("password-strength", _e));

                function No(t) {
                    const e = t.currentTarget;
                    if (!(e instanceof _e)) return;
                    const n = t.target;
                    if (!(n instanceof HTMLInputElement)) return;
                    const o = n.form;
                    if (!(o instanceof HTMLFormElement)) return;
                    const s = Ei(n.value, {
                        minimumCharacterCount: Number(e.getAttribute("minimum-character-count")),
                        passphraseLength: Number(e.getAttribute("passphrase-length"))
                    });
                    if (s.valid) {
                        n.setCustomValidity("");
                        const r = e.querySelector("dl.form-group");
                        r && (r.classList.remove("errored"), r.classList.add("successed"))
                    } else n.setCustomValidity(e.getAttribute("invalid-message") || "Invalid");
                    Li(e, s), (0, Be.G)(o)
                }
                i(No, "onInput");

                function Ei(t, e) {
                    const n = {
                        valid: !1,
                        hasMinimumCharacterCount: t.length >= e.minimumCharacterCount,
                        hasMinimumPassphraseLength: e.passphraseLength !== 0 && t.length >= e.passphraseLength,
                        hasLowerCase: /[a-z]/.test(t),
                        hasNumber: /\d/.test(t)
                    };
                    return n.valid = n.hasMinimumPassphraseLength || n.hasMinimumCharacterCount && n.hasLowerCase && n.hasNumber, n
                }
                i(Ei, "validatePassword");

                function Li(t, e) {
                    var n, o;
                    const s = t.querySelector("[data-more-than-n-chars]"),
                        r = t.querySelector("[data-min-chars]"),
                        a = t.querySelector("[data-number-requirement]"),
                        c = t.querySelector("[data-letter-requirement]"),
                        l = ((n = t.getAttribute("error-class")) == null ? void 0 : n.split(" ").filter(p => p.length > 0)) || [],
                        f = ((o = t.getAttribute("pass-class")) == null ? void 0 : o.split(" ").filter(p => p.length > 0)) || [];
                    for (const p of [s, r, a, c]) p == null || p.classList.remove(...l, ...f);
                    if (e.hasMinimumPassphraseLength && s) s.classList.add(...f);
                    else if (e.valid) r.classList.add(...f), a.classList.add(...f), c.classList.add(...f);
                    else {
                        const p = e.hasMinimumCharacterCount ? f : l,
                            E = e.hasNumber ? f : l,
                            L = e.hasLowerCase ? f : l;
                        s == null || s.classList.add(...l), r.classList.add(...p), a.classList.add(...E), c.classList.add(...L)
                    }
                }
                i(Li, "highlightPasswordStrengthExplainer");
                var nf = u(77873),
                    of = u(18539),
                    Ho = u(61075);
                class Cn extends Ho.Z {
                    async fetch(e, n = 1e3) {
                        const o = await super.fetch(e);
                        return o.status === 202 ? (await new Promise(s => setTimeout(s, n)), this.fetch(e, n * 1.5)) : o
                    }
                }
                i(Cn, "PollIncludeFragmentElement"), window.customElements.get("poll-include-fragment") || (window.PollIncludeFragmentElement = Cn, window.customElements.define("poll-include-fragment", Cn));
                var Si = u(59048);
                class kn extends Si.nJ {
                    connectedCallback() {
                        fe.push(this), Oe || (Bo(), Oe = window.setInterval(Bo, 1e3))
                    }
                    disconnectedCallback() {
                        const e = fe.indexOf(this);
                        e !== -1 && fe.splice(e, 1), fe.length || (window.clearInterval(Oe), Oe = void 0)
                    }
                    getFormattedDate() {
                        const e = this.date;
                        if (!e) return;
                        const n = new Date().getTime() - e.getTime(),
                            o = Math.floor(n / 1e3),
                            s = Math.floor(o / 60),
                            r = Math.floor(s / 60),
                            a = Math.floor(r / 24),
                            c = o - s * 60,
                            l = s - r * 60,
                            f = r - a * 24;
                        return s < 1 ? this.applyPrecision([`${o}s`]) : r < 1 ? this.applyPrecision([`${s}m`, `${c}s`]) : a < 1 ? this.applyPrecision([`${r}h`, `${l}m`, `${c}s`]) : this.applyPrecision([`${a}d`, `${f}h`, `${l}m`, `${c}s`])
                    }
                    applyPrecision(e) {
                        const n = Number(this.getAttribute("data-precision") || e.length);
                        return e.slice(0, n).join(" ")
                    }
                }
                i(kn, "PreciseTimeAgoElement");
                const fe = [];
                let Oe;

                function Bo() {
                    for (const t of fe) t.textContent = t.getFormattedDate() || ""
                }
                i(Bo, "updateNowElements"), window.customElements.get("precise-time-ago") || (window.PreciseTimeAgoElement = kn, window.customElements.define("precise-time-ago", kn));
                var _o = u(45614);
                const ji = /\s|\(|\[/;

                function Ti(t, e, n) {
                    const o = t.lastIndexOf(e, n - 1);
                    if (o === -1 || t.lastIndexOf(" ", n - 1) > o) return;
                    const r = t[o - 1];
                    return r && !ji.test(r) ? void 0 : {
                        word: t.substring(o + e.length, n),
                        position: o + e.length,
                        beginningOfLine: Ai(r)
                    }
                }
                i(Ti, "keyword");
                const Ai = i(t => t === void 0 || /\n/.test(t), "isBeginningOfLine"),
                    Ci = ["position:absolute;", "overflow:auto;", "word-wrap:break-word;", "top:0px;", "left:-9999px;"],
                    Oo = ["box-sizing", "font-family", "font-size", "font-style", "font-variant", "font-weight", "height", "letter-spacing", "line-height", "max-height", "min-height", "padding-bottom", "padding-left", "padding-right", "padding-top", "border-bottom", "border-left", "border-right", "border-top", "text-decoration", "text-indent", "text-transform", "width", "word-spacing"],
                    $o = new WeakMap;

                function ki(t, e) {
                    const n = t.nodeName.toLowerCase();
                    if (n !== "textarea" && n !== "input") throw new Error("expected textField to a textarea or input");
                    let o = $o.get(t);
                    if (o && o.parentElement === t.parentElement) o.innerHTML = "";
                    else {
                        o = document.createElement("div"), $o.set(t, o);
                        const c = window.getComputedStyle(t),
                            l = Ci.slice(0);
                        n === "textarea" ? l.push("white-space:pre-wrap;") : l.push("white-space:nowrap;");
                        for (let f = 0, p = Oo.length; f < p; f++) {
                            const E = Oo[f];
                            l.push(`${E}:${c.getPropertyValue(E)};`)
                        }
                        o.style.cssText = l.join(" ")
                    }
                    const s = document.createElement("span");
                    s.style.cssText = "position: absolute;", s.innerHTML = "&nbsp;";
                    let r, a;
                    if (typeof e == "number") {
                        let c = t.value.substring(0, e);
                        c && (r = document.createTextNode(c)), c = t.value.substring(e), c && (a = document.createTextNode(c))
                    } else {
                        const c = t.value;
                        c && (r = document.createTextNode(c))
                    }
                    if (r && o.appendChild(r), o.appendChild(s), a && o.appendChild(a), !o.parentElement) {
                        if (!t.parentElement) throw new Error("textField must have a parentElement to mirror");
                        t.parentElement.insertBefore(o, t)
                    }
                    return o.scrollTop = t.scrollTop, o.scrollLeft = t.scrollLeft, {
                        mirror: o,
                        marker: s
                    }
                }
                i(ki, "textFieldMirror");

                function xi(t, e = t.selectionEnd) {
                    const {
                        mirror: n,
                        marker: o
                    } = ki(t, e), s = n.getBoundingClientRect(), r = o.getBoundingClientRect();
                    return setTimeout(() => {
                        n.remove()
                    }, 5e3), {
                        top: r.top - s.top,
                        left: r.left - s.left
                    }
                }
                i(xi, "textFieldSelectionPosition");
                const Jt = new WeakMap;
                class Fo {
                    constructor(e, n) {
                        this.expander = e, this.input = n, this.combobox = null, this.menu = null, this.match = null, this.justPasted = !1, this.oninput = this.onInput.bind(this), this.onpaste = this.onPaste.bind(this), this.onkeydown = this.onKeydown.bind(this), this.oncommit = this.onCommit.bind(this), this.onmousedown = this.onMousedown.bind(this), this.onblur = this.onBlur.bind(this), this.interactingWithMenu = !1, n.addEventListener("paste", this.onpaste), n.addEventListener("input", this.oninput), n.addEventListener("keydown", this.onkeydown), n.addEventListener("blur", this.onblur)
                    }
                    destroy() {
                        this.input.removeEventListener("paste", this.onpaste), this.input.removeEventListener("input", this.oninput), this.input.removeEventListener("keydown", this.onkeydown), this.input.removeEventListener("blur", this.onblur)
                    }
                    activate(e, n) {
                        this.input === document.activeElement && this.setMenu(e, n)
                    }
                    deactivate() {
                        const e = this.menu,
                            n = this.combobox;
                        return !e || !n ? !1 : (this.menu = null, this.combobox = null, e.removeEventListener("combobox-commit", this.oncommit), e.removeEventListener("mousedown", this.onmousedown), n.destroy(), e.remove(), !0)
                    }
                    setMenu(e, n) {
                        this.deactivate(), this.menu = n, n.id || (n.id = `text-expander-${Math.floor(Math.random()*1e5).toString()}`), this.expander.append(n);
                        const o = n.querySelector(".js-slash-command-menu-items");
                        o ? this.combobox = new _o.Z(this.input, o) : this.combobox = new _o.Z(this.input, n);
                        const {
                            top: s,
                            left: r
                        } = xi(this.input, e.position), a = parseInt(window.getComputedStyle(this.input).fontSize);
                        n.style.top = `${s+a}px`, n.style.left = `${r}px`, this.combobox.start(), n.addEventListener("combobox-commit", this.oncommit), n.addEventListener("mousedown", this.onmousedown), this.combobox.navigate(1)
                    }
                    setValue(e) {
                        if (e == null) return;
                        const n = this.match;
                        if (!n) return;
                        const o = this.input.value.substring(0, n.position - n.key.length),
                            s = this.input.value.substring(n.position + n.text.length);
                        let {
                            cursor: r,
                            value: a
                        } = this.replaceCursorMark(e);
                        a = (a == null ? void 0 : a.length) === 0 ? a : `${a} `, this.input.value = o + a + s, this.deactivate(), this.input.focus(), r = o.length + (r || a.length), this.input.selectionStart = r, this.input.selectionEnd = r
                    }
                    replaceCursorMark(e) {
                        const n = /%cursor%/gm,
                            o = n.exec(e);
                        return o ? {
                            cursor: o.index,
                            value: e.replace(n, "")
                        } : {
                            cursor: null,
                            value: e
                        }
                    }
                    onCommit({
                        target: e
                    }) {
                        const n = e;
                        if (!(n instanceof HTMLElement) || !this.combobox) return;
                        const o = this.match;
                        if (!o) return;
                        const s = {
                            item: n,
                            key: o.key,
                            value: null
                        };
                        !this.expander.dispatchEvent(new CustomEvent("text-expander-value", {
                            cancelable: !0,
                            detail: s
                        })) || s.value && this.setValue(s.value)
                    }
                    onBlur() {
                        if (this.interactingWithMenu) {
                            this.interactingWithMenu = !1;
                            return
                        }
                        this.deactivate()
                    }
                    onPaste() {
                        this.justPasted = !0
                    }
                    async delay(e) {
                        return new Promise(n => setTimeout(n, e))
                    }
                    async onInput() {
                        if (this.justPasted) {
                            this.justPasted = !1;
                            return
                        }
                        const e = this.findMatch();
                        if (e) {
                            if (this.match = e, await this.delay(this.appropriateDelay(this.match)), this.match !== e) return;
                            const n = await this.notifyProviders(e);
                            if (!this.match) return;
                            n ? this.activate(e, n) : this.deactivate()
                        } else this.match = null, this.deactivate()
                    }
                    appropriateDelay(e) {
                        return e.beginningOfLine || e.text !== "" ? 0 : 250
                    }
                    findMatch() {
                        const e = this.input.selectionEnd,
                            n = this.input.value;
                        for (const o of this.expander.keys) {
                            const s = Ti(n, o, e);
                            if (s) return {
                                text: s.word,
                                key: o,
                                position: s.position,
                                beginningOfLine: s.beginningOfLine
                            }
                        }
                    }
                    async notifyProviders(e) {
                        const n = [],
                            o = i(c => n.push(c), "provide");
                        return this.expander.dispatchEvent(new CustomEvent("text-expander-change", {
                            cancelable: !0,
                            detail: {
                                provide: o,
                                text: e.text,
                                key: e.key
                            }
                        })) ? (await Promise.all(n)).filter(c => c.matched).map(c => c.fragment)[0] : void 0
                    }
                    onMousedown() {
                        this.interactingWithMenu = !0
                    }
                    onKeydown(e) {
                        e.key === "Escape" && this.deactivate() && (e.stopImmediatePropagation(), e.preventDefault())
                    }
                }
                i(Fo, "SlashCommandExpander");
                class xn extends HTMLElement {
                    get keys() {
                        const e = this.getAttribute("keys");
                        return e ? e.split(" ") : []
                    }
                    connectedCallback() {
                        const e = this.querySelector('input[type="text"], textarea');
                        if (!(e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement)) return;
                        const n = new Fo(this, e);
                        Jt.set(this, n)
                    }
                    disconnectedCallback() {
                        const e = Jt.get(this);
                        !e || (e.destroy(), Jt.delete(this))
                    }
                    setValue(e) {
                        const n = Jt.get(this);
                        !n || n.setValue(e)
                    }
                    setMenu(e, n = !1) {
                        const o = Jt.get(this);
                        !o || !o.match || (n && (o.interactingWithMenu = !0), o.setMenu(o.match, e))
                    }
                    closeMenu() {
                        const e = Jt.get(this);
                        !e || e.setValue("")
                    }
                    isLoading() {
                        const e = this.getElementsByClassName("js-slash-command-expander-loading")[0];
                        if (e) {
                            const n = e.cloneNode(!0);
                            n.classList.remove("d-none"), this.setMenu(n)
                        }
                    }
                    showError() {
                        const e = this.getElementsByClassName("js-slash-command-expander-error")[0];
                        if (e) {
                            const n = e.cloneNode(!0);
                            n.classList.remove("d-none"), this.setMenu(n)
                        }
                    }
                }
                i(xn, "SlashCommandExpanderElement"), window.customElements.get("slash-command-expander") || (window.SlashCommandExpanderElement = xn, window.customElements.define("slash-command-expander", xn));
                var me = u(42650),
                    d = u(11427);
                (0, d.on)("deprecatedAjaxSend", "[data-remote]", function(t) {
                    t.currentTarget === t.target && (t.defaultPrevented || t.currentTarget.classList.add("loading"))
                }), (0, d.on)("deprecatedAjaxComplete", "[data-remote]", function(t) {
                    t.currentTarget === t.target && t.currentTarget.classList.remove("loading")
                });
                var V = u(66789);
                (0, V.AC)("form.js-ajax-pagination, .js-ajax-pagination form", async function(t, e) {
                    const n = t.closest(".js-ajax-pagination");
                    let o;
                    try {
                        o = await e.html()
                    } catch (s) {
                        if (s.response && s.response.status === 404) {
                            n.remove();
                            return
                        } else throw s
                    }
                    n.replaceWith(o.html), (0, d.f)(t, "page:loaded")
                });
                var Yt = u(98129);
                const Mi = "analytics.click";
                (0, d.on)("click", "[data-analytics-event]", t => {
                    const n = t.currentTarget.getAttribute("data-analytics-event");
                    if (!n) return;
                    const o = JSON.parse(n);
                    (0, Yt.q)(Mi, o)
                });
                var at = u(3238);
                document.addEventListener("pjax:start", function() {
                    (0, at.x)("Loading page")
                }), document.addEventListener("pjax:error", function() {
                    (0, at.x)("Loading failed")
                }), document.addEventListener("pjax:end", function() {
                    (0, at.x)("Loading complete")
                }), document.addEventListener("turbo:visit", function() {
                    (0, at.x)("Loading page")
                }), document.addEventListener("turbo:load", function() {
                    (0, at.x)("Loading complete")
                });
                var y = u(30762);
                const Uo = new WeakMap;
                (0, y.N7)("auto-check", function(t) {
                    if (t.classList.contains("js-prevent-default-behavior")) return;
                    const e = t.querySelector("input");
                    if (!e) return;
                    const n = e.closest(".form-group") || t,
                        o = e.form;
                    let s;

                    function r() {
                        return s || (s = `input-check-${(Math.random()*1e4).toFixed(0)}`), s
                    }
                    i(r, "generateId");
                    const a = e.getAttribute("aria-describedby");
                    e.addEventListener("focusout:delay", () => {
                        e.setAttribute("aria-describedby", [s, a].join(" "))
                    });
                    const c = n.querySelector("p.note");
                    c && (c.id || (c.id = r()), Uo.set(c, c.innerHTML)), t.addEventListener("loadstart", () => {
                        Mn(e, n), n.classList.add("is-loading"), e.classList.add("is-autocheck-loading"), (0, Be.G)(o)
                    }), t.addEventListener("loadend", () => {
                        n.classList.remove("is-loading"), e.classList.remove("is-autocheck-loading")
                    }), e.addEventListener("auto-check-success", async l => {
                        e.classList.add("is-autocheck-successful"), n.classList.add("successed"), (0, Be.G)(o);
                        const {
                            response: f
                        } = l.detail;
                        if (!f) return;
                        const p = await f.text();
                        if (!!p) {
                            if (c instanceof HTMLElement) c.innerHTML = p, (0, at.N)(c);
                            else {
                                const E = f.status === 200,
                                    L = n.tagName === "DL" ? "dd" : "div",
                                    T = document.createElement(L);
                                T.id = r(), T.classList.add(E ? "success" : "warning"), T.innerHTML = p, n.append(T), n.classList.add(E ? "successed" : "warn"), (0, at.N)(T), E && (T.hidden = document.activeElement !== e)
                            }(0, d.f)(e, "auto-check-message-updated")
                        }
                    }), e.addEventListener("auto-check-error", async l => {
                        e.classList.add("is-autocheck-errored"), n.classList.add("errored"), (0, Be.G)(o);
                        const {
                            response: f
                        } = l.detail;
                        if (!f) return;
                        const p = await f.text();
                        if (c instanceof HTMLElement) c.innerHTML = p || "Something went wrong", (0, at.N)(c);
                        else {
                            const E = n.tagName === "DL" ? "dd" : "div",
                                L = document.createElement(E);
                            L.id = r(), L.classList.add("error"), L.innerHTML = p || "Something went wrong", n.append(L), (0, at.N)(L)
                        }
                    }), e.addEventListener("input", () => {
                        e.removeAttribute("aria-describedby"), e.value || Mn(e, n)
                    }), e.addEventListener("blur", () => {
                        const l = n.querySelector(".success");
                        l && (l.hidden = !0)
                    }), e.addEventListener("focus", () => {
                        const l = n.querySelector(".success");
                        l && (l.hidden = !1)
                    }), o.addEventListener("reset", () => {
                        Mn(e, n)
                    })
                });

                function Mn(t, e) {
                    var n, o, s, r, a, c;
                    e.classList.remove("is-loading", "successed", "errored", "warn"), t.classList.remove("is-autocheck-loading", "is-autocheck-successful", "is-autocheck-errored");
                    const l = e.querySelector("p.note");
                    if (l) {
                        const f = Uo.get(l);
                        f && (l.innerHTML = f)
                    }
                    e.tagName === "DL" ? ((n = e.querySelector("dd.error")) == null || n.remove(), (o = e.querySelector("dd.warning")) == null || o.remove(), (s = e.querySelector("dd.success")) == null || s.remove()) : ((r = e.querySelector("div.error")) == null || r.remove(), (a = e.querySelector("div.warning")) == null || a.remove(), (c = e.querySelector("div.success")) == null || c.remove())
                }
                i(Mn, "autocheck_reset");
                var qi = u(98416);
                (0, y.N7)("auto-complete", function(t) {
                    t.addEventListener("loadstart", () => t.classList.add("is-auto-complete-loading")), t.addEventListener("loadend", () => t.classList.remove("is-auto-complete-loading"))
                }), (0, y.N7)("auto-complete", {
                    constructor: qi.Z,
                    initialize: Wo
                }), (0, d.on)("auto-complete-change", "auto-complete", function(t) {
                    Wo(t.currentTarget)
                });

                function Wo(t) {
                    const e = t.closest("form");
                    if (!e) return;
                    const n = e.querySelector(".js-auto-complete-button");
                    n instanceof HTMLButtonElement && (n.disabled = !t.value)
                }
                i(Wo, "toggleSubmitButton");
                var J = u(65889),
                    wt = u(75914),
                    Qt = u(68842);
                let qn = null;
                (0, d.on)("submit", "[data-autosearch-results-container]", async function(t) {
                    const e = t.currentTarget;
                    if (!(e instanceof HTMLFormElement)) return;
                    t.preventDefault(), qn == null || qn.abort(), e.classList.add("is-sending");
                    const n = new URL(e.action, window.location.origin),
                        o = e.method,
                        s = new FormData(e),
                        r = (0, J.KL)(n, s);
                    let a = null;
                    o === "get" ? n.search = r : a = s;
                    const {
                        signal: c
                    } = qn = new AbortController, l = new Request(n.toString(), {
                        method: o,
                        body: a,
                        signal: c,
                        headers: {
                            Accept: "text/html",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    });
                    let f;
                    try {
                        f = await fetch(l)
                    } catch {}
                    if (e.classList.remove("is-sending"), !f || !f.ok || c.aborted) return;
                    const p = e.getAttribute("data-autosearch-results-container"),
                        E = p ? document.getElementById(p) : null;
                    E && (E.innerHTML = "", E.appendChild((0, wt.r)(document, await f.text()))), (0, Qt.lO)(null, "", `?${r}`)
                });
                var Ct = u(46193),
                    X = u(66123);
                (0, X.ZG)("input[data-autoselect], textarea[data-autoselect]", async function(t) {
                    await (0, Ct.gJ)(), t.select()
                });
                var te = u(56153),
                    P = u(27157);
                (0, d.on)("change", "form[data-autosubmit]", function(t) {
                    const e = t.currentTarget;
                    (0, J.Bt)(e)
                }), (0, d.on)("change", "input[data-autosubmit], select[data-autosubmit]", zo);

                function zo(t) {
                    const e = t.target;
                    if (!(e instanceof HTMLInputElement) && !(e instanceof HTMLSelectElement)) return;
                    const n = e.form;
                    (0, J.Bt)(n)
                }
                i(zo, "autosubmit_submit");
                const Pi = (0, te.D)(zo, 300);
                (0, y.N7)("input[data-throttled-autosubmit]", {
                    subscribe: t => (0, P.RB)(t, "input", Pi)
                });
                async function Ii(t) {
                    const e = t.getAttribute("data-url") || "";
                    if (await Ri(e)) {
                        const o = t.getAttribute("data-gravatar-text");
                        o != null && (t.textContent = o)
                    }
                }
                i(Ii, "detectGravatar"), (0, y.N7)(".js-detect-gravatar", function(t) {
                    Ii(t)
                });
                async function Ri(t) {
                    const e = t;
                    if (!e) return !1;
                    try {
                        const n = await fetch(e, {
                            headers: {
                                Accept: "application/json"
                            }
                        });
                        return n.ok ? (await n.json()).has_gravatar : !1
                    } catch {
                        return !1
                    }
                }
                i(Ri, "fetchGravatarInfo");
                var Di = Object.defineProperty,
                    Ni = Object.getOwnPropertyDescriptor,
                    Pn = i((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? Ni(e, n) : e, r = t.length - 1, a; r >= 0; r--)(a = t[r]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && Di(e, n, s), s
                    }, "batch_deferred_content_decorateClass");
                class Ko {
                    constructor(e = 50, n = 30) {
                        this.elements = [], this.timer = null, this.callbacks = [], this.csrf = null, this.timeout = e, this.limit = n
                    }
                    push(e) {
                        if (this.timer && (window.clearTimeout(this.timer), this.timer = null), e instanceof HTMLElement) {
                            const n = e.querySelector("[data-csrf]");
                            n !== null && (this.csrf = n.value)
                        }
                        this.elements.length >= this.limit && this.flush(), this.elements.push(e), this.timer = window.setTimeout(() => {
                            this.flush()
                        }, this.timeout)
                    }
                    onFlush(e) {
                        this.callbacks.push(e)
                    }
                    async flush() {
                        const e = this.elements.splice(0, this.limit);
                        e.length !== 0 && await Promise.all(this.callbacks.map(n => n(e)))
                    }
                }
                i(Ko, "AutoFlushingQueue");
                async function Hi(t, e) {
                    const n = await fetch(t, {
                        method: "POST",
                        body: e,
                        headers: {
                            Accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    });
                    if (n.ok) {
                        const o = await n.json(),
                            s = new Map;
                        for (const r in o) s.set(r, o[r]);
                        return s
                    } else return new Map
                }
                i(Hi, "fetchContents");
                const Vo = new Map;
                let $e = i(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.url = ""
                    }
                    connectedCallback() {
                        this.queue.push(this)
                    }
                    get queue() {
                        let t = Vo.get(this.url);
                        return t || (t = this.buildAutoFlushingQueue(), Vo.set(this.url, t), t)
                    }
                    buildAutoFlushingQueue() {
                        const t = new Ko;
                        return t.onFlush(async e => {
                            const n = new Map,
                                o = new FormData;
                            t.csrf !== null && o.set("authenticity_token", t.csrf);
                            for (const r in e) {
                                const a = e[r],
                                    c = `item-${r}`;
                                n.set(c, a);
                                for (const l of a.inputs) o.append(`items[${c}][${l.name}]`, l.value)
                            }
                            const s = await Hi(this.url, o);
                            for (const [r, a] of s.entries()) n.get(r).replaceWith((0, wt.r)(document, a))
                        }), t
                    }
                }, "BatchDeferredContentElement");
                Pn([q.Lj], $e.prototype, "url", 2), Pn([q.GO], $e.prototype, "inputs", 2), $e = Pn([q.Ih], $e);
                var he = u(97807),
                    Xo = u(73650),
                    Fe = u(44088);
                let In = null;
                (0, d.on)("click", ".js-org-signup-duration-change", t => {
                    t.preventDefault();
                    const n = t.currentTarget.getAttribute("data-plan-duration");
                    _i(n), $i(n);
                    for (const o of document.querySelectorAll(".js-seat-field")) ee(o);
                    Bi()
                }), (0, d.on)("change", ".js-org-signup-duration-toggle", function({
                    currentTarget: t
                }) {
                    const e = document.getElementById("js-pjax-container"),
                        n = new URL(t.getAttribute("data-url"), window.location.origin);
                    (0, he.ZP)({
                        url: n.toString(),
                        container: e
                    })
                });
                async function ee(t) {
                    const e = t.getAttribute("data-item-name") || "items",
                        n = t.value,
                        o = new URL(t.getAttribute("data-url"), window.location.origin),
                        s = new URLSearchParams(o.search.slice(1)),
                        r = s.get("plan_duration") || t.getAttribute("data-plan-duration"),
                        a = parseInt(t.getAttribute("data-item-minimum")) || 0,
                        c = parseInt(t.getAttribute("data-item-maximum")) || r === "year" ? 100 : 300,
                        l = parseInt(t.getAttribute("data-item-count")) || 0,
                        f = Math.max(a, parseInt(n) || 0),
                        p = f > c,
                        E = document.querySelector(".js-downgrade-button"),
                        L = document.getElementById("downgrade-disabled-message");
                    E instanceof HTMLButtonElement && (E.disabled = f === l), L instanceof HTMLElement && E instanceof HTMLButtonElement && (L.hidden = !E.disabled), s.append(e, f.toString()), document.querySelector(".js-transform-user") && s.append("transform_user", "1"), o.search = s.toString(), In == null || In.abort();
                    const {
                        signal: B
                    } = In = new AbortController;
                    let _ = null;
                    try {
                        const Xt = await fetch(o.toString(), {
                            signal: B,
                            headers: {
                                Accept: "application/json"
                            }
                        });
                        if (!Xt.ok) return;
                        _ = await Xt.json()
                    } catch {}
                    if (B.aborted || !_) return;
                    const Z = document.querySelector(".js-contact-us");
                    Z && Z.classList.toggle("d-none", !p);
                    const Q = document.querySelector(".js-payment-summary");
                    Q && Q.classList.toggle("d-none", p);
                    const z = document.querySelector(".js-submit-billing");
                    z instanceof HTMLElement && (z.hidden = p);
                    const U = document.querySelector(".js-billing-section");
                    U && U.classList.toggle("has-removed-contents", _.free || _.is_enterprise_cloud_trial);
                    const F = document.querySelector(".js-upgrade-info");
                    F && F.classList.toggle("d-none", f <= 0);
                    const et = document.querySelector(".js-downgrade-info");
                    et && et.classList.toggle("d-none", f >= 0);
                    const yt = document.querySelector(".js-extra-seats-line-item");
                    yt && yt.classList.toggle("d-none", _.no_additional_seats), document.querySelector(".js-seat-field") && Oi(n);
                    const Me = document.querySelector(".js-minimum-seats-disclaimer");
                    Me && (Me.classList.toggle("tooltipped", _.seats === 5), Me.classList.toggle("tooltipped-nw", _.seats === 5));
                    const Ot = _.selectors;
                    for (const Xt in Ot)
                        for (const qe of document.querySelectorAll(Xt)) qe.innerHTML = Ot[Xt];
                    (0, Qt.lO)((0, he.y0)(), "", _.url)
                }
                i(ee, "updateTotals");

                function Bi() {
                    for (const t of document.querySelectorAll(".js-unit-price")) t.hidden = !t.hidden
                }
                i(Bi, "toggleDurationUnitPrices");

                function _i(t) {
                    const e = t === "year" ? "month" : "year";
                    for (const o of document.querySelectorAll(".js-plan-duration-text")) o.innerHTML = t;
                    for (const o of document.querySelectorAll(".unstyled-available-plan-duration-adjective")) o.innerHTML = `${t}ly`;
                    for (const o of document.querySelectorAll(".js-org-signup-duration-change")) o.setAttribute("data-plan-duration", e);
                    const n = document.getElementById("signup-plan-duration");
                    n && (n.value = t)
                }
                i(_i, "updateDurationFields");

                function Oi(t) {
                    var e;
                    for (const n of document.querySelectorAll(".js-seat-field")) {
                        const o = n.getAttribute("data-item-max-seats"),
                            s = (e = n == null ? void 0 : n.parentNode) == null ? void 0 : e.querySelector(".Popover");
                        o && o.length ? parseInt(t, 10) > parseInt(o, 10) ? (n.classList.add("color-border-danger-emphasis"), s == null || s.removeAttribute("hidden")) : (n.classList.remove("color-border-danger-emphasis"), s == null || s.setAttribute("hidden", "true"), n.value = t) : n.value = t
                    }
                }
                i(Oi, "updateSeatFields");

                function $i(t) {
                    for (const e of document.querySelectorAll(".js-seat-field")) {
                        const n = new URL(e.getAttribute("data-url"), window.location.origin),
                            o = new URLSearchParams(n.search.slice(1));
                        o.delete("plan_duration"), o.append("plan_duration", t), n.search = o.toString(), e.setAttribute("data-url", n.toString())
                    }
                }
                i($i, "updateSeatFieldURLs"), (0, y.N7)(".js-addon-purchase-field", {
                    constructor: HTMLInputElement,
                    add(t) {
                        (0, Fe.Z)(t) && ee(t), (0, Xo.oq)(t, function() {
                            ee(t)
                        })
                    }
                }), (0, y.N7)(".js-addon-downgrade-field", {
                    constructor: HTMLSelectElement,
                    add(t) {
                        (0, Fe.Z)(t) && ee(t), t.addEventListener("change", function() {
                            ee(t)
                        })
                    }
                });

                function Fi(t) {
                    const e = document.querySelector(".js-addon-purchase-field"),
                        n = t.target.querySelector("input:checked");
                    if (e instanceof HTMLInputElement && n instanceof HTMLInputElement) {
                        const o = n.getAttribute("data-upgrade-url");
                        o && (e.setAttribute("data-url", o), e.value = "0", ee(e))
                    }
                }
                i(Fi, "handleOrgChange"), (0, d.on)("details-menu-selected", ".js-organization-container", Fi, {
                    capture: !0
                }), (0, X.q6)(".js-csv-filter-field", function(t) {
                    const e = t.target.value.toLowerCase();
                    for (const n of document.querySelectorAll(".js-csv-data tbody tr")) n instanceof HTMLElement && (!n.textContent || (n.hidden = !!e && !n.textContent.toLowerCase().includes(e)))
                }), (0, y.N7)(".js-blob-header.is-stuck", {
                    add(t) {
                        Go(t)
                    },
                    remove(t) {
                        Go(t, !0)
                    }
                });

                function Go(t, e = !1) {
                    const n = {
                        "tooltipped-nw": "tooltipped-sw",
                        "tooltipped-n": "tooltipped-s",
                        "tooltipped-ne": "tooltipped-se"
                    };
                    for (const [o, s] of Object.entries(n)) {
                        const r = e ? s : o,
                            a = e ? o : s;
                        for (const c of t.querySelectorAll(`.${r}`)) c.classList.replace(r, a)
                    }
                }
                i(Go, "flipTooltip");

                function Zo(t) {
                    const e = t.match(/#?(?:L)(\d+)((?:C)(\d+))?/g);
                    if (e)
                        if (e.length === 1) {
                            const n = Rn(e[0]);
                            return n ? Object.freeze({
                                start: n,
                                end: n
                            }) : void 0
                        } else if (e.length === 2) {
                        const n = Rn(e[0]),
                            o = Rn(e[1]);
                        return !n || !o ? void 0 : es(Object.freeze({
                            start: n,
                            end: o
                        }))
                    } else return;
                    else return
                }
                i(Zo, "parseBlobRange");

                function Ui(t) {
                    const {
                        start: e,
                        end: n
                    } = es(t);
                    return e.column != null && n.column != null ? `L${e.line}C${e.column}-L${n.line}C${n.column}` : e.line === n.line ? `L${e.line}` : `L${e.line}-L${n.line}`
                }
                i(Ui, "formatBlobRange");

                function Wi(t) {
                    const e = t.match(/(file-.+?-)L\d+?/i);
                    return e ? e[1] : ""
                }
                i(Wi, "parseAnchorPrefix");

                function Jo(t) {
                    const e = Zo(t),
                        n = Wi(t);
                    return {
                        blobRange: e,
                        anchorPrefix: n
                    }
                }
                i(Jo, "parseFileAnchor");

                function zi({
                    anchorPrefix: t,
                    blobRange: e
                }) {
                    return e ? `#${t}${Ui(e)}` : "#"
                }
                i(zi, "formatBlobRangeAnchor");

                function Rn(t) {
                    const e = t.match(/L(\d+)/),
                        n = t.match(/C(\d+)/);
                    return e ? Object.freeze({
                        line: parseInt(e[1]),
                        column: n ? parseInt(n[1]) : null
                    }) : null
                }
                i(Rn, "parseBlobOffset");

                function Yo(t, e) {
                    const [n, o] = Qo(t.start, !0, e), [s, r] = Qo(t.end, !1, e);
                    if (!n || !s) return;
                    let a = o,
                        c = r;
                    if (a === -1 && (a = 0), c === -1 && (c = s.childNodes.length), !n.ownerDocument) throw new Error("DOMRange needs to be inside document");
                    const l = n.ownerDocument.createRange();
                    return l.setStart(n, a), l.setEnd(s, c), l
                }
                i(Yo, "DOMRangeFromBlob");

                function Qo(t, e, n) {
                    const o = [null, 0],
                        s = n(t.line);
                    if (!s) return o;
                    if (t.column == null) return [s, -1];
                    let r = t.column - 1;
                    const a = ts(s);
                    for (let c = 0; c < a.length; c++) {
                        const l = a[c],
                            f = r - (l.textContent || "").length;
                        if (f === 0) {
                            const p = a[c + 1];
                            return e && p ? [p, 0] : [l, r]
                        } else if (f < 0) return [l, r];
                        r = f
                    }
                    return o
                }
                i(Qo, "findRangeOffset");

                function ts(t) {
                    if (t.nodeType === Node.TEXT_NODE) return [t];
                    if (!t.childNodes || !t.childNodes.length) return [];
                    let e = [];
                    for (const n of t.childNodes) e = e.concat(ts(n));
                    return e
                }
                i(ts, "getAllTextNodes");

                function es(t) {
                    const e = [t.start, t.end];
                    return e.sort(Ki), e[0] === t.start && e[1] === t.end ? t : Object.freeze({
                        start: e[0],
                        end: e[1]
                    })
                }
                i(es, "ascendingBlobRange");

                function Ki(t, e) {
                    return t.line === e.line && t.column === e.column ? 0 : t.line === e.line && typeof t.column == "number" && typeof e.column == "number" ? t.column - e.column : t.line - e.line
                }
                i(Ki, "compareBlobOffsets");
                var ns = u(71217),
                    Et = u(89390),
                    Ue = u(47789);

                function os(t, e) {
                    e.appendChild(t.extractContents()), t.insertNode(e)
                }
                i(os, "surroundContents");
                let Dn = !1;

                function Nn(t, e) {
                    return document.querySelector(`#${t}LC${e}`)
                }
                i(Nn, "queryLineElement");

                function Vi({
                    blobRange: t,
                    anchorPrefix: e
                }) {
                    if (document.querySelectorAll(".js-file-line").length !== 0 && (Xi(), !!t)) {
                        if (t.start.column === null || t.end.column === null)
                            for (let o = t.start.line; o <= t.end.line; o += 1) {
                                const s = Nn(e, o);
                                s && s.classList.add("highlighted")
                            } else if (t.start.line === t.end.line && t.start.column != null && t.end.column != null) {
                                const o = Yo(t, s => Nn(e, s));
                                if (o) {
                                    const s = document.createElement("span");
                                    s.classList.add("highlighted"), os(o, s)
                                }
                            }
                    }
                }
                i(Vi, "highlightLines");

                function Xi() {
                    for (const t of document.querySelectorAll(".js-file-line.highlighted")) t.classList.remove("highlighted");
                    for (const t of document.querySelectorAll(".js-file-line .highlighted")) {
                        const e = t.closest(".js-file-line");
                        t.replaceWith(...t.childNodes), e.normalize()
                    }
                }
                i(Xi, "clearHighlights");

                function Gi() {
                    const t = Jo(window.location.hash);
                    Vi(t), ea();
                    const {
                        blobRange: e,
                        anchorPrefix: n
                    } = t, o = e && Nn(n, e.start.line);
                    if (!Dn && o) {
                        o.scrollIntoView();
                        const s = o.closest(".blob-wrapper, .js-blob-wrapper");
                        s.scrollLeft = 0
                    }
                    Dn = !1
                }
                i(Gi, "scrollLinesIntoView"), (0, Ue.Z)(function() {
                    if (document.querySelector(".js-file-line-container")) {
                        setTimeout(Gi, 0);
                        const t = window.location.hash;
                        for (const e of document.querySelectorAll(".js-update-url-with-hash"))
                            if (e instanceof HTMLAnchorElement) e.hash = t;
                            else if (e instanceof HTMLFormElement) {
                            const n = new URL(e.action, window.location.origin);
                            n.hash = t, e.action = n.toString()
                        }
                    }
                });

                function Zi(t) {
                    const e = [];
                    for (const o of t) e.push(o.textContent);
                    const n = document.getElementById("js-copy-lines");
                    if (n instanceof ns.Z) {
                        n.textContent = `Copy ${t.length===1?"line":"lines"}`, n.value = e.join(`
`);
                        const o = `Blob, copyLines, numLines:${t.length.toString()}`;
                        n.setAttribute("data-ga-click", o)
                    }
                }
                i(Zi, "setCopyLines");

                function Ji(t) {
                    const e = document.querySelector(".js-permalink-shortcut");
                    if (e instanceof HTMLAnchorElement) {
                        const n = `${e.href}${window.location.hash}`,
                            o = document.getElementById("js-copy-permalink");
                        if (o instanceof ns.Z) {
                            o.value = n;
                            const s = `Blob, copyPermalink, numLines:${t.toString()}`;
                            o.setAttribute("data-ga-click", s)
                        }
                        return n
                    }
                }
                i(Ji, "setPermalink");

                function Yi(t, e) {
                    const n = document.getElementById("js-new-issue");
                    if (n instanceof HTMLAnchorElement) {
                        if (!n.href) return;
                        const o = new URL(n.href, window.location.origin),
                            s = new URLSearchParams(o.search);
                        s.set("permalink", t), o.search = s.toString(), n.href = o.toString(), n.setAttribute("data-ga-click", `Blob, newIssue, numLines:${e.toString()}`)
                    }
                }
                i(Yi, "setOpenIssueLink");

                function Qi(t, e) {
                    const n = document.getElementById("js-new-discussion");
                    if (!(n instanceof HTMLAnchorElement) || !(n == null ? void 0 : n.href)) return;
                    const o = new URL(n.href, window.location.origin),
                        s = new URLSearchParams(o.search);
                    s.set("permalink", t), o.search = s.toString(), n.href = o.toString(), n.setAttribute("data-ga-click", `Blob, newDiscussion, numLines:${e.toString()}`)
                }
                i(Qi, "setOpenDiscussionLink");

                function ta(t) {
                    const e = document.getElementById("js-view-git-blame");
                    !e || e.setAttribute("data-ga-click", `Blob, viewGitBlame, numLines:${t.toString()}`)
                }
                i(ta, "setViewGitBlame");

                function ea() {
                    const t = document.querySelector(".js-file-line-actions");
                    if (!t) return;
                    const e = document.querySelectorAll(".js-file-line.highlighted"),
                        n = e[0];
                    if (n) {
                        Zi(e), ta(e.length);
                        const o = Ji(e.length);
                        o && Yi(o, e.length), o && Qi(o, e.length), t.style.top = `${n.offsetTop-2}px`, t.classList.remove("d-none")
                    } else t.classList.add("d-none")
                }
                i(ea, "showOrHideLineActions");

                function na(t) {
                    const e = window.scrollY;
                    Dn = !0, t(), window.scrollTo(0, e)
                }
                i(na, "preserveLineNumberScrollPosition"), (0, d.on)("click", ".js-line-number", function(t) {
                    const e = Jo(t.currentTarget.id),
                        {
                            blobRange: n
                        } = e,
                        o = Zo(window.location.hash);
                    o && t.shiftKey && (e.blobRange = {
                        start: o.start,
                        end: n.end
                    }), na(() => {
                        window.location.hash = zi(e)
                    })
                }), (0, d.on)("submit", ".js-jump-to-line-form", function(t) {
                    const o = t.currentTarget.querySelector(".js-jump-to-line-field").value.replace(/[^\d-]/g, "").split("-").map(s => parseInt(s, 10)).filter(s => s > 0).sort((s, r) => s - r);
                    o.length && (window.location.hash = `L${o.join("-L")}`), t.preventDefault()
                }), (0, y.N7)(".js-check-bidi", ra);
                const oa = /[\u202A-\u202E]|[\u2066-\u2069]/,
                    ss = {
                        "\u202A": "U+202A",
                        "\u202B": "U+202B",
                        "\u202C": "U+202C",
                        "\u202D": "U+202D",
                        "\u202E": "U+202E",
                        "\u2066": "U+2066",
                        "\u2067": "U+2067",
                        "\u2068": "U+2068",
                        "\u2069": "U+2069"
                    };

                function rs(t, e) {
                    if (t.nodeType === Node.TEXT_NODE) return sa(t, e);
                    if (!t.childNodes || !t.childNodes.length) return !1;
                    let n = !1;
                    for (const o of t.childNodes)
                        if (n || (n = rs(o, e)), n && !e) break;
                    return n
                }
                i(rs, "checkNodeForBidiCharacters");

                function sa(t, e) {
                    let n = !1;
                    if (t.nodeValue)
                        for (let o = t.nodeValue.length - 1; o >= 0; o--) {
                            const s = t.nodeValue.charAt(o);
                            if (ss[s]) {
                                if (n = !0, !e) break;
                                const r = new Et.R(e, {
                                        revealedCharacter: ss[s]
                                    }),
                                    a = new Range;
                                a.setStart(t, o), a.setEnd(t, o + 1), a.deleteContents(), a.insertNode(r)
                            }
                        }
                    return n
                }
                i(sa, "checkTextNodeForBidiCharacters");

                function ra(t) {
                    let e = !1;
                    const n = performance.now(),
                        o = t.textContent || "";
                    if (oa.test(o)) {
                        const a = t.querySelectorAll(".diff-table .blob-code-inner, .js-file-line-container .js-file-line, .js-suggested-changes-blob .blob-code-inner"),
                            c = document.querySelector(".js-line-alert-template"),
                            l = document.querySelector(".js-revealed-character-template");
                        for (const f of a)
                            if (rs(f, l) && (e = !0, c)) {
                                const p = new Et.R(c, {});
                                t.getAttribute("data-line-alert") === "before" ? f.before(p) : f.after(p)
                            }
                    }
                    const r = {
                        durationMs: (performance.now() - n).toString(),
                        result: e.toString()
                    };
                    if ((0, Yt.q)("blob_js_check_bidi_character", r), e) {
                        const a = document.querySelector(".js-file-alert-template");
                        if (a) {
                            const c = new URL(window.location.href, window.location.origin);
                            c.searchParams.get("h") === "1" ? c.searchParams.delete("h") : c.searchParams.set("h", "1");
                            const l = new Et.R(a, {
                                revealButtonHref: c.href
                            });
                            t.prepend(l)
                        }
                    }
                    t.classList.remove("js-check-bidi")
                }
                i(ra, "alertOnBidiCharacter");
                class is {
                    constructor(e, n) {
                        this.lineElement = e, this.numberElement = n
                    }
                    range(e, n) {
                        e = isNaN(e) ? 0 : e, n = isNaN(n) ? 0 : n;
                        let o = null,
                            s = 0,
                            r = 0;
                        for (const [c, l] of this.lineElement.childNodes.entries()) {
                            const f = (l.textContent || "").length;
                            if (f > e && !o && (o = l, s = c), f >= n) {
                                r = c;
                                break
                            }
                            e -= f, n -= f
                        }
                        const a = document.createRange();
                        if (s === r) {
                            for (; o && o.nodeName !== "#text";) o = o.childNodes[0];
                            if (!o) return null;
                            a.setStart(o, e), a.setEnd(o, n)
                        } else a.setStart(this.lineElement, s), a.setEnd(this.lineElement, r + 1);
                        return a
                    }
                }
                i(is, "CodeListingLine");
                class as {
                    constructor(e) {
                        this.container = e
                    }
                    findLine(e) {
                        if (!e) return null;
                        const n = this.container.querySelector(`.js-blob-rnum[data-line-number='${e}']`);
                        if (!n) return null;
                        let o = n.nextElementSibling;
                        return !o || !o.classList.contains("js-file-line") ? null : (o = o.querySelector(".js-code-nav-pass") || o, new is(o, n))
                    }
                }
                i(as, "CodeListing");
                const cs = new WeakMap;

                function ls(t) {
                    const e = t.closest(".js-blob-code-container, .js-file-content"),
                        n = t.querySelector(".js-codeowners-error-tooltip-template"),
                        o = t.querySelector(".js-codeowners-error-line-alert-template");
                    if (!e || !n || !o) return;
                    const s = t.querySelectorAll(".js-codeowners-error"),
                        r = new as(e);
                    for (const a of s) {
                        if (cs.get(a)) continue;
                        const c = a.getAttribute("data-line"),
                            l = a.getAttribute("data-kind"),
                            f = a.getAttribute("data-suggestion"),
                            p = parseInt(a.getAttribute("data-start-offset") || "", 10),
                            E = parseInt(a.getAttribute("data-end-offset") || "", 10),
                            L = r.findLine(c),
                            T = L == null ? void 0 : L.range(p, E);
                        if (!L || !T) continue;
                        let B = l;
                        f && (B += `: ${f}`);
                        const _ = document.createElement("SPAN");
                        _.className = "error-highlight", T.surroundContents(_);
                        const Z = new Et.R(n, {
                            message: B
                        }).firstElementChild;
                        T.surroundContents(Z);
                        const Q = new Et.R(o, {});
                        L.numberElement.appendChild(Q), cs.set(a, !0)
                    }
                }
                i(ls, "annotateCodeownersErrors"), (0, y.N7)(".js-codeowners-errors", ls), (0, d.on)("expander:expanded", ".js-file", function(t) {
                    if (!t.target || !(t.target instanceof HTMLElement)) return;
                    const e = t.target.querySelector(".js-codeowners-errors");
                    !e || ls(e)
                });

                function ia(t) {
                    const e = t.target,
                        n = e == null ? void 0 : e.closest(".js-branch-protection-integration-select"),
                        o = n == null ? void 0 : n.querySelector(".js-branch-protection-integration-select-current"),
                        s = e == null ? void 0 : e.closest(".js-branch-protection-integration-select-item"),
                        r = s == null ? void 0 : s.querySelector(".js-branch-protection-integration-select-label");
                    o && r && n && (o.innerHTML = r.innerHTML, n.open = !1)
                }
                i(ia, "changeSelection"), (0, d.on)("change", ".js-branch-protection-integration-select-input", ia);

                function aa(t) {
                    const e = new URL(t.getAttribute("data-bulk-actions-url"), window.location.origin),
                        n = new URLSearchParams(e.search.slice(1)),
                        o = t.getAttribute("data-bulk-actions-parameter"),
                        s = Array.from(t.querySelectorAll(".js-bulk-actions-toggle:checked"));
                    if (o) {
                        const r = s.map(a => a.closest(".js-bulk-actions-item").getAttribute("data-bulk-actions-id")).sort();
                        for (const a of r) n.append(`${o}[]`, a)
                    } else
                        for (const r of s.sort((a, c) => a.value > c.value ? 1 : -1)) n.append(r.name, r.value);
                    return e.search = n.toString(), e.toString()
                }
                i(aa, "bulkUrl");
                let Hn = null;
                async function ca(t) {
                    const e = t.target;
                    if (!(e instanceof HTMLElement)) return;
                    const n = e.querySelector(".js-bulk-actions"),
                        o = !!e.querySelector(".js-bulk-actions-toggle:checked");
                    Hn == null || Hn.abort();
                    const {
                        signal: s
                    } = Hn = new AbortController;
                    let r = "";
                    try {
                        const a = await fetch(aa(e), {
                            signal: s,
                            headers: {
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        });
                        if (!a.ok) return;
                        r = await a.text()
                    } catch {}
                    s.aborted || !r || (o ? (us(e), n.innerHTML = r) : (n.innerHTML = r, us(e)), (0, d.f)(e, "bulk-actions:updated"))
                }
                i(ca, "updateBulkActions");

                function us(t) {
                    const e = document.querySelector(".js-membership-tabs");
                    if (e) {
                        const n = t.querySelectorAll(".js-bulk-actions-toggle:checked");
                        e.classList.toggle("d-none", n.length > 0)
                    }
                }
                i(us, "toggleMembershipTabs"), (0, d.on)("change", ".js-bulk-actions-toggle", function(t) {
                    const n = t.currentTarget.closest(".js-bulk-actions-container");
                    (0, d.f)(n, "bulk-actions:update")
                }), (0, d.on)("bulk-actions:update", ".js-bulk-actions-container", (0, te.D)(ca, 100));
                var kt = u(2998),
                    Lt = u(76343);

                function la(t) {
                    try {
                        const e = window.localStorage.getItem(t);
                        return {
                            kind: "ok",
                            value: e ? JSON.parse(e) : null
                        }
                    } catch (e) {
                        return {
                            kind: "err",
                            value: e
                        }
                    }
                }
                i(la, "getLocalJSON");

                function ds(t, e) {
                    try {
                        return window.localStorage.setItem(t, JSON.stringify(e)), {
                            kind: "ok",
                            value: null
                        }
                    } catch (n) {
                        return {
                            kind: "err",
                            value: n
                        }
                    }
                }
                i(ds, "setLocalJSON");

                function ua() {
                    const t = {};
                    for (const e of document.getElementsByTagName("script")) {
                        const n = e.src.match(/\/([\w-]+)-[0-9a-f]{8,}\.js$/);
                        n && (t[`${n[1]}.js`] = e.src)
                    }
                    for (const e of document.getElementsByTagName("link")) {
                        const n = e.href.match(/\/([\w-]+)-[0-9a-f]{8,}\.css$/);
                        n && (t[`${n[1]}.css`] = e.href)
                    }
                    return t
                }
                i(ua, "gatherBundleURLs");

                function da() {
                    const t = ua(),
                        e = la("bundle-urls");
                    if (e.kind === "err") {
                        ds("bundle-urls", t);
                        return
                    }
                    const n = e.value || {},
                        o = Object.keys(t).filter(s => n[s] !== t[s]);
                    o.length && ds("bundle-urls", {
                        ...n,
                        ...t
                    }).kind === "ok" && (0, Lt.b)({
                        downloadedBundles: o
                    })
                }
                i(da, "report"), (async () => (await kt.C, window.requestIdleCallback(da)))();
                var sf = u(55566);

                function fa(t) {
                    t.preventDefault(), t.stopPropagation()
                }
                i(fa, "cancelEvent"), (0, y.N7)("a.btn.disabled", {
                    subscribe: t => (0, P.RB)(t, "click", fa)
                });
                var Bn = u(57692),
                    rf = u(16354),
                    pe = u(93632);
                const fs = "logout-was-successful";

                function ma() {
                    for (const t of [sessionStorage, localStorage]) try {
                        t.clear()
                    } catch {}
                }
                i(ma, "clearData");

                function ha() {
                    (0, pe.$1)(fs).length > 0 && (ma(), (0, pe.kT)(fs))
                }
                i(ha, "clearDataIfJustLoggedOut"), ha();
                const ms = 2e3;
                (0, d.on)("clipboard-copy", "[data-copy-feedback]", t => {
                    const e = t.currentTarget,
                        n = e.getAttribute("data-copy-feedback"),
                        o = e.getAttribute("aria-label"),
                        s = e.getAttribute("data-tooltip-direction") || "s";
                    e.setAttribute("aria-label", n), e.classList.add("tooltipped", `tooltipped-${s}`), e instanceof HTMLElement && ((0, at.N)(e), setTimeout(() => {
                        o ? e.setAttribute("aria-label", o) : e.removeAttribute("aria-label"), e.classList.remove("tooltipped", `tooltipped-${s}`)
                    }, ms))
                });

                function pa(t) {
                    _n.delete(t), hs(t)
                }
                i(pa, "timerCallback");

                function hs(t) {
                    const e = t.querySelector(".js-clipboard-copy-icon"),
                        n = t.querySelector(".js-clipboard-check-icon");
                    t.classList.toggle("ClipboardButton--success"), e && e.classList.toggle("d-none"), n && (n.classList.contains("d-sm-none") ? n.classList.toggle("d-sm-none") : n.classList.toggle("d-none"))
                }
                i(hs, "toggleCopyButton");
                const _n = new WeakMap;
                (0, d.on)("clipboard-copy", ".js-clipboard-copy:not([data-view-component])", function({
                    currentTarget: t
                }) {
                    if (!(t instanceof HTMLElement)) return;
                    const e = _n.get(t);
                    e ? clearTimeout(e) : hs(t), _n.set(t, window.setTimeout(pa, ms, t))
                }), (0, d.on)("click", ".js-code-nav-retry", async function(t) {
                    if (t.altKey || t.ctrlKey || t.metaKey || t.shiftKey) return;
                    const e = document.querySelector(".js-tagsearch-popover");
                    if (!e) return;
                    const n = e.querySelector(".js-tagsearch-popover-content");
                    if (!n) return;
                    let o;
                    const s = t.currentTarget;
                    if (s.getAttribute("data-code-nav-kind") === "definitions" ? o = e.querySelector(".js-tagsearch-popover-content") : o = e.querySelector(".js-code-nav-references"), !o) return;
                    const a = s.getAttribute("data-code-nav-url");
                    if (!a) return;
                    const c = new URL(a, window.location.origin);
                    try {
                        const l = await fetch(c.toString(), {
                            headers: {
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        });
                        if (!l.ok) return;
                        const f = await l.text();
                        if (!f) return;
                        o.innerHTML = f
                    } catch {
                        return
                    }
                    n.scrollTop = 0
                }), (0, y.N7)(".js-code-nav-container", {
                    constructor: HTMLElement,
                    subscribe(t) {
                        const e = t,
                            n = document.querySelector(".js-tagsearch-popover");
                        if (!(n instanceof HTMLElement)) return {
                            unsubscribe() {}
                        };
                        const o = n.querySelector(".js-tagsearch-popover-content"),
                            s = new WeakMap,
                            r = new WeakMap;
                        let a;
                        c();

                        function c() {
                            B();
                            for (const z of document.getElementsByClassName("pl-token")) z.classList.remove("pl-token", "active")
                        }
                        i(c, "initialize");
                        async function l(z) {
                            const U = ba(/\w+[!?]?/g, z.clientX, z.clientY);
                            if (!U) return;
                            const F = U.commonAncestorContainer.parentElement;
                            for (const Yd of F.classList)
                                if (["pl-token", "pl-c", "pl-s", "pl-k"].includes(Yd)) return;
                            if (F.closest(".js-skip-tagsearch")) return;
                            const et = U.toString();
                            if (!et || et.match(/\n|\s|[();&.=",]/)) return;
                            let yt = r.get(F);
                            if (yt || (yt = new Set, r.set(F, yt)), yt.has(et)) return;
                            yt.add(et);
                            const _t = F.closest(".js-tagsearch-file");
                            if (!_t) return;
                            const Me = _t.getAttribute("data-tagsearch-path") || "";
                            let Ot = _t.getAttribute("data-tagsearch-lang") || "";
                            if (Ot === "HTML+ERB")
                                if (F.closest(".pl-sre")) Ot = "Ruby";
                                else return;
                            if (t.classList.contains("js-code-block-container") && (Ot = va(F) || "", !Ot)) return;
                            const Xt = wa(U),
                                qe = await ga(n, et, Ot, Xt, Me);
                            if (!qe) return;
                            const le = document.createElement("span");
                            le.classList.add("pl-token"), le.addEventListener("click", p);
                            const pi = document.createElement("span");
                            pi.innerHTML = qe;
                            const Ro = pi.firstElementChild;
                            if (!Ro) return;
                            const gi = Ro.getAttribute("data-hydro-click"),
                                bi = Ro.getAttribute("data-hydro-click-hmac");
                            bi && gi && (le.setAttribute("data-hydro-click", gi), le.setAttribute("data-hydro-click-hmac", bi)), s.set(le, qe), U.surroundContents(le)
                        }
                        i(l, "onMouseMove");

                        function f() {
                            o.scrollTop = 0
                        }
                        i(f, "resetScrollTop");

                        function p(z) {
                            if (z.altKey || z.ctrlKey || z.metaKey || z.shiftKey) return;
                            const U = z.currentTarget;
                            U === a ? B() : (E(U), T()), z.preventDefault()
                        }
                        i(p, "onClick");

                        function E(z) {
                            a && a.classList.remove("active"), a = z, a.classList.add("active"), o.innerHTML = s.get(z) || "", L(z)
                        }
                        i(E, "populatePopover");

                        function L(z) {
                            const U = e.getClientRects()[0],
                                F = z.getClientRects()[0];
                            n.style.position = "absolute", n.style.zIndex = "1", e.classList.contains("position-relative") ? (n.style.top = `${F.bottom-U.top+7}px`, n.style.left = `${F.left-U.left-10}px`) : (n.style.top = `${window.scrollY+F.bottom+7}px`, n.style.left = `${window.scrollX+F.left-10}px`)
                        }
                        i(L, "positionPopover");

                        function T() {
                            if (!n.hidden) {
                                f();
                                return
                            }
                            n.hidden = !1, f(), document.addEventListener("click", Z), document.addEventListener("keyup", Q), window.addEventListener("resize", _)
                        }
                        i(T, "showPopover");

                        function B() {
                            n.hidden || (n.hidden = !0, a && a.classList.remove("active"), a = void 0, document.removeEventListener("click", Z), document.removeEventListener("keyup", Q), window.removeEventListener("resize", _))
                        }
                        i(B, "hidePopover");

                        function _() {
                            a instanceof HTMLElement && L(a)
                        }
                        i(_, "onResize");

                        function Z(z) {
                            const {
                                target: U
                            } = z;
                            U instanceof Node && !n.contains(U) && !a.contains(U) && B()
                        }
                        i(Z, "onDocumentClick");

                        function Q(z) {
                            switch (z.key) {
                                case "Escape":
                                    B();
                                    break
                            }
                        }
                        return i(Q, "onKeyup"), t.addEventListener("mousemove", l), {
                            unsubscribe() {
                                t.removeEventListener("mousemove", l)
                            }
                        }
                    }
                });
                async function ga(t, e, n, o, s) {
                    const r = t.getAttribute("data-tagsearch-url");
                    if (!r) return "";
                    const a = t.getAttribute("data-tagsearch-ref");
                    if (!a) return "";
                    let c = t.getAttribute("data-tagsearch-code-nav-context");
                    c || (c = "UNKNOWN_VIEW");
                    const l = new URL(r, window.location.origin),
                        f = new URLSearchParams;
                    f.set("q", e), f.set("blob_path", s), f.set("ref", a), f.set("language", n), f.set("row", o[0].toString()), f.set("col", o[1].toString()), f.set("code_nav_context", c), l.search = f.toString();
                    try {
                        const p = await fetch(l.toString(), {
                            headers: {
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        });
                        if (!p.ok) return "";
                        const E = await p.text();
                        return /js-tagsearch-no-definitions/.test(E) ? "" : E
                    } catch {
                        return ""
                    }
                }
                i(ga, "fetchPopoverContents");

                function ba(t, e, n) {
                    let o, s;
                    if (document.caretPositionFromPoint) {
                        const l = document.caretPositionFromPoint(e, n);
                        l && (o = l.offsetNode, s = l.offset)
                    } else if (document.caretRangeFromPoint) {
                        const l = document.caretRangeFromPoint(e, n);
                        l && (o = l.startContainer, s = l.startOffset)
                    }
                    if (!o || typeof s != "number" || o.nodeType !== Node.TEXT_NODE) return;
                    const r = o.textContent;
                    if (!r) return null;
                    const a = ya(r, t, s);
                    if (!a) return null;
                    const c = document.createRange();
                    return c.setStart(o, a[1]), c.setEnd(o, a[2]), c
                }
                i(ba, "matchFromPoint");

                function ya(t, e, n) {
                    let o;
                    for (; o = e.exec(t);) {
                        const s = o.index + o[0].length;
                        if (o.index <= n && n < s) return [o[0], o.index, s]
                    }
                    return null
                }
                i(ya, "findNearestMatch");

                function va(t) {
                    const e = t.closest(".highlight");
                    if (e)
                        for (const n of e.classList) switch (n) {
                            case "highlight-source-go":
                                return "Go";
                            case "highlight-source-js":
                                return "JavaScript";
                            case "highlight-source-python":
                                return "Python";
                            case "highlight-source-ruby":
                                return "Ruby";
                            case "highlight-source-ts":
                                return "TypeScript"
                        }
                    return null
                }
                i(va, "getCodeBlockLanguage");

                function wa(t) {
                    let e = t.startContainer,
                        n = t.startOffset,
                        o = !1;
                    for (;;) {
                        let s = e.previousSibling;
                        for (; !o && s;)["#comment", "BUTTON"].includes(s.nodeName) || (n += (s.textContent || "").length), s = s.previousSibling;
                        const r = e.parentElement;
                        if (r) {
                            if (r.classList.contains("js-code-nav-pass")) o = !0;
                            else if (r.classList.contains("js-file-line")) {
                                const a = r.previousElementSibling;
                                if (!a.classList.contains("js-code-nav-line-number")) throw new Error("invariant");
                                return [parseInt(a.getAttribute("data-line-number") || "1", 10) - 1, n]
                            }
                            e = r
                        } else return [0, 0]
                    }
                }
                i(wa, "getRowAndColumn");
                var xt = u(61257);

                function Ea(t) {
                    const e = t.querySelector(".js-comment-form-error");
                    e instanceof HTMLElement && (e.hidden = !0)
                }
                i(Ea, "clearFormError"), (0, d.on)("click", ".errored.js-remove-error-state-on-click", function({
                    currentTarget: t
                }) {
                    t.classList.remove("errored")
                }), (0, V.AC)(".js-new-comment-form", async function(t, e) {
                    let n;
                    Ea(t);
                    try {
                        n = await e.json()
                    } catch (r) {
                        La(t, r)
                    }
                    if (!n) return;
                    t.reset();
                    for (const r of t.querySelectorAll(".js-resettable-field"))(0, J.Se)(r, r.getAttribute("data-reset-value") || "");
                    const o = t.querySelector(".js-write-tab");
                    o instanceof HTMLElement && o.click();
                    const s = n.json.updateContent;
                    for (const r in s) {
                        const a = s[r],
                            c = document.querySelector(r);
                        c instanceof HTMLElement ? (0, xt.Of)(c, a) : console.warn(`couldn't find ${r} for immediate update`)
                    }(0, d.f)(t, "comment:success")
                });

                function La(t, e) {
                    let n = "You can't comment at this time";
                    if (e.response && e.response.status === 422) {
                        const s = e.response.json;
                        s.errors && (Array.isArray(s.errors) ? n += ` \u2014 your comment ${s.errors.join(", ")}` : n = s.errors)
                    }
                    n += ". ";
                    const o = t.querySelector(".js-comment-form-error");
                    if (o instanceof HTMLElement) {
                        o.textContent = n, o.hidden = !1;
                        const s = o.closest("div.form-group.js-remove-error-state-on-click");
                        s && s.classList.add("errored")
                    }
                }
                i(La, "handleFormError");
                const Sa = i((t, e) => {
                        const n = t.querySelector(".js-form-action-text"),
                            o = n || t;
                        o.textContent = e ? t.getAttribute("data-comment-text") : o.getAttribute("data-default-action-text")
                    }, "setButtonText"),
                    ja = i(t => {
                        let e;
                        return n => {
                            const s = n.currentTarget.value.trim();
                            s !== e && (e = s, Sa(t, Boolean(s)))
                        }
                    }, "createInputHandler");
                (0, y.N7)(".js-comment-and-button", {
                    constructor: HTMLButtonElement,
                    initialize(t) {
                        const e = t.form.querySelector(".js-comment-field"),
                            n = ja(t);
                        return {
                            add() {
                                e.addEventListener("input", n), e.addEventListener("change", n)
                            },
                            remove() {
                                e.removeEventListener("input", n), e.removeEventListener("change", n)
                            }
                        }
                    }
                });
                var af = u(26712);

                function ps(t, e) {
                    const n = t.closest(".js-write-bucket");
                    n && n.classList.toggle("focused", e)
                }
                i(ps, "toggleFocus");

                function Ta(t) {
                    const e = t.currentTarget;
                    e instanceof Element && ps(e, !1)
                }
                i(Ta, "blurred"), (0, X.ZG)(".js-comment-field", function(t) {
                    ps(t, !0), t.addEventListener("blur", Ta, {
                        once: !0
                    })
                });
                var ne = u(41885),
                    pt = u(724),
                    On = u(4364);
                const Aa = 2303741511,
                    Ca = 4;
                class We {
                    static fromFile(e) {
                        return new Promise(function(n, o) {
                            const s = new FileReader;
                            s.onload = function() {
                                n(new We(s.result))
                            }, s.onerror = function() {
                                o(s.error)
                            }, s.readAsArrayBuffer(e)
                        })
                    }
                    constructor(e) {
                        this.dataview = new DataView(e), this.pos = 0
                    }
                    advance(e) {
                        this.pos += e
                    }
                    readInt(e) {
                        const n = this,
                            o = function() {
                                switch (e) {
                                    case 1:
                                        return n.dataview.getUint8(n.pos);
                                    case 2:
                                        return n.dataview.getUint16(n.pos);
                                    case 4:
                                        return n.dataview.getUint32(n.pos);
                                    default:
                                        throw new Error("bytes parameter must be 1, 2 or 4")
                                }
                            }();
                        return this.advance(e), o
                    }
                    readChar() {
                        return this.readInt(1)
                    }
                    readShort() {
                        return this.readInt(2)
                    }
                    readLong() {
                        return this.readInt(4)
                    }
                    readString(e) {
                        const n = [];
                        for (let o = 0; o < e; o++) n.push(String.fromCharCode(this.readChar()));
                        return n.join("")
                    }
                    scan(e) {
                        if (this.readLong() !== Aa) throw new Error("invalid PNG");
                        for (this.advance(4);;) {
                            const n = this.readLong(),
                                o = this.readString(4),
                                s = this.pos + n + Ca;
                            if (e.call(this, o, n) === !1 || o === "IEND") break;
                            this.pos = s
                        }
                    }
                }
                i(We, "PNGScanner");
                const ka = .0254;
                async function xa(t) {
                    if (t.type !== "image/png") return null;
                    const e = t.slice(0, 10240, t.type),
                        n = await We.fromFile(e),
                        o = {
                            width: 0,
                            height: 0,
                            ppi: 1
                        };
                    return n.scan(function(s) {
                        switch (s) {
                            case "IHDR":
                                return o.width = this.readLong(), o.height = this.readLong(), !0;
                            case "pHYs": {
                                const r = this.readLong(),
                                    a = this.readLong(),
                                    c = this.readChar();
                                let l;
                                return c === 1 && (l = ka), l && (o.ppi = Math.round((r + a) / 2 * l)), !1
                            }
                            case "IDAT":
                                return !1
                        }
                        return !0
                    }), o
                }
                i(xa, "imageDimensions");
                var Ma = u(80832);
                const ze = new WeakMap;
                class gs {
                    constructor(e, n, o) {
                        this.index = e, this.coords = n, this.textArea = o
                    }
                    get top() {
                        return this.coords.top
                    }
                    get left() {
                        return this.coords.left
                    }
                    get height() {
                        return this.coords.height
                    }
                    currentChar(e = 1) {
                        return this.textArea.value.substring(this.index - e, this.index)
                    }
                    checkLine(e) {
                        return e < this.coords.top ? -1 : e > this.coords.top + this.coords.height ? 1 : 0
                    }
                    xDistance(e) {
                        return Math.abs(this.left - e)
                    }
                }
                i(gs, "CaretPosition");

                function Mt(t, e) {
                    let n;
                    if (ze.has(t) ? n = ze.get(t) : (n = new Map, ze.set(t, n)), n.has(e)) return n.get(e); {
                        const o = new gs(e, (0, Ma.Z)(t, e), t);
                        return n.set(e, o), o
                    }
                }
                i(Mt, "fetchCaretCoords");
                const ge = i((t, e, n, o, s, r) => {
                        if (n === e) return n;
                        const a = i(p => {
                            const E = p.filter(L => L.checkLine(s) === 0).sort((L, T) => L.xDistance(o) > T.xDistance(o) ? 1 : -1);
                            return E.length === 0 ? n : E[0].index
                        }, "bestPosition");
                        if (n - e === 1) {
                            const p = Mt(t, e),
                                E = Mt(t, n);
                            return a([p, E])
                        }
                        if (n - e === 2) {
                            const p = Mt(t, e),
                                E = Mt(t, n - 1),
                                L = Mt(t, n);
                            return a([p, E, L])
                        }
                        const c = Math.floor((n + e) / 2);
                        if (c === e || c === n) return c;
                        const l = Mt(t, c);
                        if (s > l.top + l.height) return ge(t, c + 1, n, o, s, r + 1);
                        if (s < l.top) return ge(t, e, c - 1, o, s, r + 1);
                        const f = 3;
                        return l.xDistance(o) < f ? c : l.left < o ? Mt(t, c + 1).checkLine(s) !== 0 ? c : ge(t, c + 1, n, o, s, r + 1) : l.left > o ? Mt(t, c - 1).checkLine(s) !== 0 ? c : ge(t, e, c - 1, o, s, r + 1) : c
                    }, "binaryCursorSearch"),
                    qa = i((t, e, n) => {
                        const s = t.value.length - 1;
                        return ge(t, 0, s, e, n, 0)
                    }, "findCursorPosition");

                function Pa(t, e, n) {
                    const o = qa(t, e, n);
                    t.setSelectionRange(o, o)
                }
                i(Pa, "setCursorPosition");

                function Ia(t, e) {
                    const n = t.getBoundingClientRect();
                    e.type === "dragenter" && ze.delete(t);
                    const o = e.clientX - n.left,
                        s = e.clientY - n.top + t.scrollTop;
                    Pa(t, o, s)
                }
                i(Ia, "caret_placement_updateCaret"), (0, y.N7)(".js-paste-markdown", {
                    constructor: HTMLElement,
                    add(t) {
                        (0, pt.F6)(t), (0, pt.CR)(t), (0, pt.jw)(t), (0, pt.AL)(t), (0, pt.AI)(t)
                    },
                    remove(t) {
                        (0, pt.KB)(t), (0, pt.XR)(t), (0, pt.Hl)(t), (0, pt.mK)(t), (0, pt.TR)(t)
                    }
                });
                const $n = new WeakMap;

                function cf(t, e) {
                    $n.set(t, e)
                }
                i(cf, "cachePlaceholder");

                function Ra(t) {
                    return $n.get(t) || ys(t)
                }
                i(Ra, "getPlaceholder");

                function Fn(t) {
                    return ["video/mp4", "video/quicktime"].includes(t.file.type)
                }
                i(Fn, "isVideo");

                function Da(t) {
                    return t.replace(/[[\]\\"<>&]/g, ".").replace(/\.{2,}/g, ".").replace(/^\.|\.$/gi, "")
                }
                i(Da, "parameterizeName");

                function bs(t) {
                    return Fn(t) ? `
Uploading ${t.file.name}\u2026
` : `${t.isImage()?"!":""}[Uploading ${t.file.name}\u2026]()`
                }
                i(bs, "placeholderText");

                function Na(t) {
                    return Da(t).replace(/\.[^.]+$/, "").replace(/\./g, " ")
                }
                i(Na, "altText");
                const Ha = 72 * 2;

                function Ke(t) {
                    const n = t.target.closest("form").querySelector(".btn-primary");
                    n.disabled = !0
                }
                i(Ke, "disableSubmit");

                function Ve(t) {
                    const n = t.target.closest("form").querySelector(".btn-primary");
                    n.disabled = !1
                }
                i(Ve, "enableSubmit");
                async function Ba(t) {
                    const {
                        attachment: e
                    } = t.detail, n = t.currentTarget;
                    let o;
                    e.isImage() ? o = await $a(e) : Fn(e) ? o = Oa(e) : o = _a(e), ws("", o, t, n)
                }
                i(Ba, "onUploadCompleted");

                function _a(t) {
                    return `[${t.file.name}](${t.href})`
                }
                i(_a, "mdLink");

                function Oa(t) {
                    return `
${t.href}
`
                }
                i(Oa, "videoMarkdown");
                async function $a(t) {
                    const e = await Fa(t.file),
                        n = Na(t.file.name),
                        o = t.href;
                    return e.ppi === Ha ? `<img width="${Math.round(e.width/2)}" alt="${n}" src="${o}">` : `![${n}](${o})`
                }
                i($a, "imageTag");
                async function Fa(t) {
                    var e;
                    const n = {
                        width: 0,
                        height: 0,
                        ppi: 0
                    };
                    try {
                        return (e = await xa(t)) != null ? e : n
                    } catch {
                        return n
                    }
                }
                i(Fa, "imageSize");

                function ys(t) {
                    const e = bs(t);
                    return Fn(t) ? `
${e}
` : `${e}
`
                }
                i(ys, "replacementText");

                function vs(t) {
                    const e = t.currentTarget.querySelector(".js-comment-field"),
                        n = Ra(t.detail.attachment);
                    if (e) e.setCustomValidity(""), (0, ne.lp)(e, n, "");
                    else {
                        const s = (0, On.P)(t.currentTarget.querySelector(".js-code-editor")).editor.getSearchCursor(n);
                        s.findNext(), s.replace("")
                    }
                }
                i(vs, "removeFailedUpload");

                function ws(t, e, n, o) {
                    const s = (o || n.currentTarget).querySelector(".js-comment-field"),
                        r = (o || n.currentTarget).querySelector(".js-file-upload-loading-text"),
                        a = bs(n.detail.attachment),
                        {
                            batch: c
                        } = n.detail;
                    if (s) {
                        const l = s.value.substring(s.selectionStart, s.selectionEnd);
                        if (t === "uploading") {
                            let f;
                            l.length ? f = (0, ne.t4)(s, l, a) : f = (0, ne.Om)(s, a, {
                                appendNewline: !0
                            }), $n.set(n.detail.attachment, f)
                        } else(0, ne.lp)(s, a, e);
                        c.isFinished() ? Ve(n) : Ke(n)
                    } else {
                        const l = (0, On.P)((o || n.currentTarget).querySelector(".js-code-editor")).editor;
                        if (t === "uploading")
                            if (l.getSelection().length) l.replaceSelection(a);
                            else {
                                const f = l.getCursor(),
                                    p = ys(n.detail.attachment);
                                l.replaceRange(p, f)
                            }
                        else {
                            const f = l.getSearchCursor(a);
                            f.findNext(), f.replace(e)
                        }
                        c.isFinished() ? Ve(n) : Ke(n)
                    }
                    if (r) {
                        const l = r.getAttribute("data-file-upload-message");
                        r.textContent = `${l} (${c.uploaded()+1}/${c.size})`
                    }
                }
                i(ws, "setValidityAndLinkText"), (0, d.on)("upload:setup", ".js-upload-markdown-image", function(t) {
                    ws("uploading", "", t)
                }), (0, d.on)("upload:complete", ".js-upload-markdown-image", Ba), (0, d.on)("upload:error", ".js-upload-markdown-image", function(t) {
                    vs(t);
                    const {
                        batch: e
                    } = t.detail;
                    e.isFinished() ? Ve(t) : Ke(t)
                });

                function Es(t) {
                    var e;
                    t.stopPropagation();
                    const n = t.currentTarget;
                    if (!n) return;
                    const o = n.querySelector(".js-comment-field");
                    if (o) Ia(o, t);
                    else {
                        const s = (e = (0, On.P)(n.querySelector(".js-code-editor"))) == null ? void 0 : e.editor;
                        if (s) {
                            const r = s.coordsChar({
                                left: t.pageX,
                                top: t.pageY
                            });
                            s.setCursor(r)
                        }
                    }
                }
                i(Es, "updateCursor");
                const lf = i(t => {
                    const e = t.currentTarget,
                        n = e.getBoundingClientRect(),
                        o = t.clientX - n.left,
                        s = t.clientY - n.top + e.scrollTop;
                    console.log({
                        x: o,
                        y: s,
                        cursor: e.selectionStart,
                        t: e.value.substring(e.selectionStart - 10, e.selectionStart)
                    });
                    const r = new DragEvent("dragenter", {
                        clientX: t.clientX,
                        clientY: t.clientY
                    });
                    updateCaret(e, r)
                }, "debugUpdateCaret");
                (0, d.on)("dragenter", "file-attachment", Es), (0, d.on)("dragover", "file-attachment", Es), (0, d.on)("upload:invalid", ".js-upload-markdown-image", function(t) {
                    vs(t);
                    const {
                        batch: e
                    } = t.detail;
                    e.isFinished() ? Ve(t) : Ke(t)
                });
                var Un = u(85435),
                    St = u(53294);

                function Ua(t) {
                    const e = t.querySelector(".js-data-preview-url-csrf"),
                        n = t.closest("form").elements.namedItem("authenticity_token");
                    if (e instanceof HTMLInputElement) return e.value;
                    if (n instanceof HTMLInputElement) return n.value;
                    throw new Error("Comment preview authenticity token not found")
                }
                i(Ua, "token");

                function Wn(t) {
                    const e = t.closest(".js-previewable-comment-form"),
                        n = t.classList.contains("js-preview-tab");
                    if (n) {
                        const r = e.querySelector(".js-write-bucket"),
                            a = e.querySelector(".js-preview-body");
                        r.clientHeight > 0 && (a.style.minHeight = `${r.clientHeight}px`)
                    }
                    e.classList.toggle("preview-selected", n), e.classList.toggle("write-selected", !n);
                    const o = e.querySelector('.tabnav-tab.selected, .tabnav-tab[aria-selected="true"]');
                    o.setAttribute("aria-selected", "false"), o.classList.remove("selected"), t.classList.add("selected"), t.setAttribute("aria-selected", "true");
                    const s = e.querySelector(".js-write-tab");
                    return n ? s.setAttribute("data-hotkey", "Control+P,Meta+Shift+p") : s.removeAttribute("data-hotkey"), e
                }
                i(Wn, "activateTab"), (0, d.on)("click", ".js-write-tab", function(t) {
                    const e = t.currentTarget,
                        n = e.closest(".js-previewable-comment-form");
                    if (n instanceof Un.Z) {
                        setTimeout(() => {
                            n.querySelector(".js-comment-field").focus()
                        });
                        return
                    }
                    const o = Wn(e);
                    (0, d.f)(n, "preview:toggle:off");
                    const s = n.querySelector(".js-discussion-poll-form-component");
                    s && (0, d.f)(s, "poll-preview:toggle:off"), setTimeout(() => {
                        o.querySelector(".js-comment-field").focus()
                    });
                    const r = n.querySelector("markdown-toolbar");
                    r instanceof HTMLElement && (r.hidden = !1)
                }), (0, d.on)("click", ".js-preview-tab", function(t) {
                    const e = t.currentTarget,
                        n = e.closest(".js-previewable-comment-form");
                    if (n instanceof Un.Z) return;
                    const o = Wn(e);
                    (0, d.f)(n, "preview:toggle:on"), setTimeout(() => {
                        Kn(o)
                    });
                    const s = n.querySelector("markdown-toolbar");
                    s instanceof HTMLElement && (s.hidden = !0), t.stopPropagation(), t.preventDefault()
                }), (0, d.on)("tab-container-change", ".js-previewable-comment-form", function(t) {
                    const e = t.detail.relatedTarget,
                        n = e && e.classList.contains("js-preview-panel"),
                        o = t.currentTarget,
                        s = o.querySelector(".js-write-tab");
                    if (n) {
                        const r = o.querySelector(".js-write-bucket"),
                            a = o.querySelector(".js-preview-body");
                        !a.hasAttribute("data-skip-sizing") && r.clientHeight > 0 && (a.style.minHeight = `${r.clientHeight}px`), s.setAttribute("data-hotkey", "Control+P,Meta+Shift+p"), Kn(o);
                        const l = o.querySelector("markdown-toolbar");
                        l instanceof HTMLElement && (l.hidden = !0)
                    } else {
                        s.removeAttribute("data-hotkey");
                        const r = o.querySelector("markdown-toolbar");
                        r instanceof HTMLElement && (r.hidden = !1);
                        const a = document.querySelector(".js-discussion-poll-form-component");
                        a && (0, d.f)(a, "poll-preview:toggle:off")
                    }
                    o.classList.toggle("preview-selected", n), o.classList.toggle("write-selected", !n)
                }), (0, d.on)("preview:render", ".js-previewable-comment-form", function(t) {
                    const e = t.target.querySelector(".js-preview-tab"),
                        n = Wn(e);
                    setTimeout(() => {
                        Kn(n);
                        const o = n.querySelector("markdown-toolbar");
                        o instanceof HTMLElement && (o.hidden = !0)
                    })
                });

                function Wa(t) {
                    var e, n, o, s, r, a, c, l, f;
                    const p = t.querySelector(".js-comment-field").value,
                        E = (e = t.querySelector(".js-path")) == null ? void 0 : e.value,
                        L = (n = t.querySelector(".js-line-number")) == null ? void 0 : n.value,
                        T = (o = t.querySelector(".js-start-line-number")) == null ? void 0 : o.value,
                        B = (s = t.querySelector(".js-side")) == null ? void 0 : s.value,
                        _ = (r = t.querySelector(".js-start-side")) == null ? void 0 : r.value,
                        Z = (a = t.querySelector(".js-start-commit-oid")) == null ? void 0 : a.value,
                        Q = (c = t.querySelector(".js-end-commit-oid")) == null ? void 0 : c.value,
                        z = (l = t.querySelector(".js-base-commit-oid")) == null ? void 0 : l.value,
                        U = (f = t.querySelector(".js-comment-id")) == null ? void 0 : f.value,
                        F = new FormData;
                    return F.append("text", p), F.append("authenticity_token", Ua(t)), E && F.append("path", E), L && F.append("line_number", L), T && F.append("start_line_number", T), B && F.append("side", B), _ && F.append("start_side", _), Z && F.append("start_commit_oid", Z), Q && F.append("end_commit_oid", Q), z && F.append("base_commit_oid", z), U && F.append("comment_id", U), F
                }
                i(Wa, "previewForm");

                function Ls(t) {
                    const e = t.getAttribute("data-preview-url"),
                        n = Wa(t);
                    return (0, d.f)(t, "preview:setup", {
                        data: n
                    }), za(e, n)
                }
                i(Ls, "fetchPreview");
                const za = (0, St.Z)(Ka, {
                    hash: Va
                });
                let zn = null;
                async function Ka(t, e) {
                    zn == null || zn.abort();
                    const {
                        signal: n
                    } = zn = new AbortController, o = await fetch(t, {
                        method: "post",
                        body: e,
                        signal: n
                    });
                    if (!o.ok) throw new Error("something went wrong");
                    return o.text()
                }
                i(Ka, "uncachedFetch");

                function Va(t, e) {
                    const n = [...e.entries()].toString();
                    return `${t}:${n}`
                }
                i(Va, "hash");
                async function Kn(t) {
                    const e = t.querySelector(".comment-body");
                    e.innerHTML = "<p>Loading preview&hellip;</p>";
                    try {
                        const n = await Ls(t);
                        e.innerHTML = n || "<p>Nothing to preview</p>", (0, d.f)(t, "preview:rendered")
                    } catch (n) {
                        n.name !== "AbortError" && (e.innerHTML = "<p>Error rendering preview</p>")
                    }
                }
                i(Kn, "renderPreview"), (0, y.N7)(".js-preview-tab", function(t) {
                    t.addEventListener("mouseenter", async () => {
                        const e = t.closest(".js-previewable-comment-form");
                        try {
                            await Ls(e)
                        } catch {}
                    })
                }), (0, X.w4)("keydown", ".js-comment-field", function(t) {
                    const e = t.target;
                    if ((t.ctrlKey || t.metaKey) && t.shiftKey && t.key.toUpperCase() === "P") {
                        const n = e.closest(".js-previewable-comment-form");
                        n.classList.contains("write-selected") && (n instanceof Un.Z ? n.querySelector(".js-preview-tab").click() : (e.blur(), n.dispatchEvent(new CustomEvent("preview:render", {
                            bubbles: !0,
                            cancelable: !1
                        }))), t.preventDefault(), t.stopImmediatePropagation())
                    }
                });
                const Ss = /^(\+1|-1|:\+1?|:-1?)$/,
                    Xa = i(t => {
                        let e = !1;
                        for (const n of t.split(`
`)) {
                            const o = n.trim();
                            if (!(!o || o.startsWith(">"))) {
                                if (e && Ss.test(o) === !1) return !1;
                                !e && Ss.test(o) && (e = !0)
                            }
                        }
                        return e
                    }, "isReactionLikeComment");
                (0, d.on)("focusout", "#new_comment_field", function(t) {
                    const n = t.currentTarget.closest(".js-reaction-suggestion");
                    n && Ts(n)
                }), (0, d.on)("focusin", "#new_comment_field", function(t) {
                    js(t)
                }), (0, X.w4)("keyup", "#new_comment_field", function(t) {
                    js(t)
                });

                function js(t) {
                    const e = t.target,
                        n = e.value,
                        o = e.closest(".js-reaction-suggestion");
                    if (!!o)
                        if (Xa(n)) {
                            o.classList.remove("hide-reaction-suggestion"), o.classList.add("reaction-suggestion");
                            const s = o.getAttribute("data-reaction-markup");
                            o.setAttribute("data-reaction-suggestion-message", s)
                        } else Ts(o)
                }
                i(js, "toggleReactionSuggestion");

                function Ts(t) {
                    t.classList.remove("reaction-suggestion"), t.classList.add("hide-reaction-suggestion"), t.removeAttribute("data-reaction-suggestion-message")
                }
                i(Ts, "clearReactionSuggestion");
                var As = u(83895);
                (0, d.on)("navigation:keydown", ".js-commits-list-item", function(t) {
                    !(0, As.Zf)(t.detail.originalEvent) || t.target instanceof Element && t.detail.hotkey === "c" && t.target.querySelector(".js-navigation-open").click()
                });
                var uf = u(4904);
                (0, X.q6)(".js-company-name-input", function(t) {
                    const e = t.target,
                        n = e.form,
                        o = n.querySelector(".js-corp-tos-link"),
                        s = n.querySelector(".js-tos-link");
                    s && (s.classList.add("d-none"), s.setAttribute("aria-hidden", "true"), o && (o.classList.remove("d-none"), o.setAttribute("aria-hidden", "false")));
                    const r = n.querySelectorAll(".js-company-name-text");
                    if (r.length !== 0)
                        for (const a of r)
                            if (e.value)
                                if (a.hasAttribute("data-wording")) {
                                    const l = a.getAttribute("data-wording");
                                    a.textContent = ` ${l} ${e.value}`
                                } else a.textContent = e.value;
                    else a.textContent = ""
                }), (0, y.N7)(".js-company-owned:not(:checked)", {
                    constructor: HTMLInputElement,
                    add(t) {
                        const n = t.form.querySelector(".js-company-name-input"),
                            o = document.querySelector(".js-company-name-text"),
                            s = document.querySelector(".js-corp-tos-link"),
                            r = document.querySelector(".js-tos-link");
                        n && (t.getAttribute("data-optional") && n.removeAttribute("required"), (0, J.Se)(n, "")), r.classList.remove("d-none"), r.setAttribute("aria-hidden", "false"), s.classList.add("d-none"), s.setAttribute("aria-hidden", "true"), o && (o.textContent = "")
                    }
                }), (0, y.N7)(".js-company-owned:checked", {
                    constructor: HTMLInputElement,
                    add(t) {
                        const n = t.form.querySelector(".js-company-name-input");
                        n && (n.setAttribute("required", ""), (0, d.f)(n, "focus"), (0, d.f)(n, "input"))
                    }
                }), (0, y.N7)(".js-company-owned-autoselect", {
                    constructor: HTMLInputElement,
                    add(t) {
                        const e = t;

                        function n() {
                            if (e.checked && e.form) {
                                const o = e.form.querySelector(".js-company-owned");
                                (0, J.Se)(o, !0)
                            }
                        }
                        i(n, "autoselect"), e.addEventListener("change", n), n()
                    }
                });
                var Vn = u(99481);
                (0, y.N7)("include-fragment, poll-include-fragment", {
                    subscribe: t => (0, P.qC)((0, P.RB)(t, "error", Za), (0, P.RB)(t, "loadstart", Ga))
                }), (0, d.on)("click", "include-fragment button[data-retry-button]", ({
                    currentTarget: t
                }) => {
                    const e = t.closest("include-fragment"),
                        n = e.src;
                    e.src = "", e.src = n
                });

                function Cs(t, e) {
                    const n = t.currentTarget;
                    if (n instanceof Element) {
                        for (const o of n.querySelectorAll("[data-show-on-error]")) o instanceof HTMLElement && (o.hidden = !e);
                        for (const o of n.querySelectorAll("[data-hide-on-error]")) o instanceof HTMLElement && (o.hidden = e)
                    }
                }
                i(Cs, "toggleElements");

                function Ga(t) {
                    Cs(t, !1)
                }
                i(Ga, "onLoad");

                function Za(t) {
                    Cs(t, !0)
                }
                i(Za, "onError");

                function ks({
                    currentTarget: t
                }) {
                    t instanceof Element && xs(t)
                }
                i(ks, "loadDeferredContentByEvent");

                function xs(t) {
                    const e = t.closest("details");
                    e && Ja(e)
                }
                i(xs, "loadDeferredContent");

                function Ja(t) {
                    const e = t.getAttribute("data-deferred-details-content-url");
                    if (e) {
                        t.removeAttribute("data-deferred-details-content-url");
                        const n = t.querySelector("include-fragment, poll-include-fragment");
                        n && (n.src = e)
                    }
                }
                i(Ja, "setIncludeFragmentSrc");
                let qt = null;
                document.addEventListener("keydown", function(t) {
                    !t.defaultPrevented && t.key === "Escape" && qt && qt.removeAttribute("open")
                }), (0, y.N7)(".js-dropdown-details", {
                    subscribe: t => (0, P.qC)((0, P.RB)(t, "toggle", Qa), (0, P.RB)(t, "toggle", Ya))
                });

                function Ya({
                    currentTarget: t
                }) {
                    const e = t;
                    if (e.hasAttribute("open")) {
                        const n = e.querySelector("[autofocus]");
                        n && n.focus()
                    } else {
                        const n = e.querySelector("summary");
                        n && n.focus()
                    }
                }
                i(Ya, "autofocus");

                function Qa({
                    currentTarget: t
                }) {
                    const e = t;
                    e.hasAttribute("open") ? (qt && qt !== e && qt.removeAttribute("open"), qt = e) : e === qt && (qt = null)
                }
                i(Qa, "closeCurrentDetailsDropdown"), (0, y.N7)("[data-deferred-details-content-url]:not([data-details-no-preload-on-hover])", {
                    subscribe: t => {
                        const e = t.querySelector("summary");
                        return (0, P.RB)(e, "mouseenter", ks)
                    }
                }), (0, y.N7)("[data-deferred-details-content-url]", {
                    subscribe: t => (0, P.RB)(t, "toggle", ks)
                }), (0, d.on)("click", "[data-toggle-for]", function(t) {
                    const e = t.currentTarget.getAttribute("data-toggle-for") || "",
                        n = document.getElementById(e);
                    !n || (n.hasAttribute("open") ? n.removeAttribute("open") : n.setAttribute("open", "open"))
                }), (0, Ue.Z)(function({
                    target: t
                }) {
                    if (!t || t.closest("summary")) return;
                    let e = t.parentElement;
                    for (; e;) e = e.closest("details"), e && (e.hasAttribute("open") || e.setAttribute("open", ""), e = e.parentElement)
                }), (0, d.on)("details-dialog-close", "[data-disable-dialog-dismiss]", function(t) {
                    t.preventDefault()
                });
                var tc = u(48219);
                (0, y.N7)("details.select-menu details-menu include-fragment", function(t) {
                    const e = t.closest("details");
                    !e || (t.addEventListener("loadstart", function() {
                        e.classList.add("is-loading"), e.classList.remove("has-error")
                    }), t.addEventListener("error", function() {
                        e.classList.add("has-error")
                    }), t.addEventListener("loadend", function() {
                        e.classList.remove("is-loading");
                        const n = e.querySelector(".js-filterable-field");
                        n && (0, d.f)(n, "filterable:change")
                    }))
                }), (0, y.N7)("details details-menu .js-filterable-field", {
                    constructor: HTMLInputElement,
                    add(t) {
                        const e = t.closest("details");
                        e.addEventListener("toggle", function() {
                            e.hasAttribute("open") || (t.value = "", (0, d.f)(t, "filterable:change"))
                        })
                    }
                }), (0, y.N7)("details-menu[role=menu] [role=menu]", t => {
                    const e = t.closest("details-menu[role]");
                    e && e !== t && e.removeAttribute("role")
                }), (0, y.N7)("details details-menu remote-input input", {
                    constructor: HTMLInputElement,
                    add(t) {
                        const e = t.closest("details");
                        e.addEventListener("toggle", function() {
                            e.hasAttribute("open") || (t.value = "")
                        })
                    }
                }), (0, y.N7)("form details-menu", t => {
                    const e = t.closest("form");
                    e.addEventListener("reset", () => {
                        setTimeout(() => ec(e), 0)
                    })
                });

                function ec(t) {
                    const e = t.querySelectorAll("details-menu [role=menuitemradio] input[type=radio]:checked");
                    for (const n of e)(0, d.f)(n, "change")
                }
                i(ec, "resetMenus"), (0, X.w4)("keypress", "details-menu .js-filterable-field, details-menu filter-input input", t => {
                    if (t.key === "Enter") {
                        const o = t.currentTarget.closest("details-menu").querySelector('[role^="menuitem"]:not([hidden])');
                        o instanceof HTMLElement && o.click(), t.preventDefault()
                    }
                }), (0, d.on)("details-menu-selected", "details-menu", t => {
                    const n = t.currentTarget.querySelector(".js-filterable-field");
                    n instanceof HTMLInputElement && n.value && n.focus()
                }, {
                    capture: !0
                }), (0, d.on)("details-menu-selected", "[data-menu-input]", t => {
                    if (!(t.target instanceof Element)) return;
                    const e = t.target.getAttribute("data-menu-input"),
                        n = document.getElementById(e);
                    (n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) && (n.value = t.detail.relatedTarget.value)
                }, {
                    capture: !0
                }), (0, y.N7)("details-menu remote-input", {
                    constructor: tc.Z,
                    initialize(t) {
                        const e = document.getElementById(t.getAttribute("aria-owns") || "");
                        if (!e) return;
                        let n = null;
                        t.addEventListener("load", () => {
                            document.activeElement && e.contains(document.activeElement) && document.activeElement.id ? n = document.activeElement.id : n = null
                        }), t.addEventListener("loadend", () => {
                            if (n) {
                                const o = e.querySelector(`#${n}`) || e.querySelector('[role^="menu"]');
                                o instanceof HTMLElement ? o.focus() : t.input && t.input.focus()
                            }
                        })
                    }
                }), (0, d.on)("details-menu-selected", "details-menu[data-menu-max-options]", t => {
                    const e = +t.currentTarget.getAttribute("data-menu-max-options"),
                        n = t.currentTarget.querySelectorAll('[role="menuitemcheckbox"][aria-checked="true"]'),
                        o = e === n.length;
                    t.currentTarget.querySelector("[data-menu-max-options-warning]").hidden = !o;
                    for (const s of t.currentTarget.querySelectorAll('[role="menuitemcheckbox"] input')) s.disabled = o && !s.checked
                }, {
                    capture: !0
                }), (0, y.N7)("details > details-menu", {
                    subscribe(t) {
                        const e = t.closest("details");
                        return (0, P.RB)(e, "toggle", nc)
                    }
                });
                async function nc({
                    currentTarget: t
                }) {
                    const e = t,
                        n = e.hasAttribute("open");
                    (0, d.f)(e, n ? "menu:activate" : "menu:deactivate"), await (0, Ct.gJ)(), (0, d.f)(e, n ? "menu:activated" : "menu:deactivated")
                }
                i(nc, "fireMenuToggleEvent"), (0, y.N7)("details > details-menu[preload]:not([src])", {
                    subscribe(t) {
                        return (0, P.RB)(t.parentElement, "mouseover", function(e) {
                            const o = e.currentTarget.querySelector("include-fragment[src]");
                            o == null || o.load()
                        })
                    }
                });
                const Xn = new WeakMap,
                    Ms = ["input[type=submit][data-disable-with]", "button[data-disable-with]"].join(", ");

                function oc(t) {
                    return t instanceof HTMLInputElement ? t.value || "Submit" : t.innerHTML || ""
                }
                i(oc, "getButtonText");

                function qs(t, e) {
                    t instanceof HTMLInputElement ? t.value = e : t.innerHTML = e
                }
                i(qs, "disable_with_setButtonText"), (0, d.on)("submit", "form", function(t) {
                    for (const e of t.currentTarget.querySelectorAll(Ms)) {
                        Xn.set(e, oc(e));
                        const n = e.getAttribute("data-disable-with");
                        n && qs(e, n), e.disabled = !0
                    }
                }, {
                    capture: !0
                });

                function Ps(t) {
                    for (const e of t.querySelectorAll(Ms)) {
                        const n = Xn.get(e);
                        n != null && (qs(e, n), (!e.hasAttribute("data-disable-invalid") || t.checkValidity()) && (e.disabled = !1), Xn.delete(e))
                    }
                }
                i(Ps, "revert"), (0, d.on)("deprecatedAjaxComplete", "form", function({
                    currentTarget: t,
                    target: e
                }) {
                    t === e && Ps(t)
                }), (0, V.uT)(Ps), (0, y.N7)(".js-document-dropzone", {
                    constructor: HTMLElement,
                    add(t) {
                        document.body.addEventListener("dragstart", Ns), document.body.addEventListener("dragend", Hs), document.body.addEventListener("dragenter", Xe), document.body.addEventListener("dragover", Xe), document.body.addEventListener("dragleave", Rs), t.addEventListener("drop", Ds)
                    },
                    remove(t) {
                        document.body.removeEventListener("dragstart", Ns), document.body.removeEventListener("dragend", Hs), document.body.removeEventListener("dragenter", Xe), document.body.removeEventListener("dragover", Xe), document.body.removeEventListener("dragleave", Rs), t.removeEventListener("drop", Ds)
                    }
                });

                function Is(t) {
                    return Array.from(t.types).indexOf("Files") >= 0
                }
                i(Is, "hasFile");
                let Gn = null;

                function Xe(t) {
                    if (Zn) return;
                    const e = t.currentTarget;
                    Gn && window.clearTimeout(Gn), Gn = window.setTimeout(() => e.classList.remove("dragover"), 200);
                    const n = t.dataTransfer;
                    !n || !Is(n) || (n.dropEffect = "copy", e.classList.add("dragover"), t.stopPropagation(), t.preventDefault())
                }
                i(Xe, "onDragenter");

                function Rs(t) {
                    t.target instanceof Element && t.target.classList.contains("js-document-dropzone") && t.currentTarget.classList.remove("dragover")
                }
                i(Rs, "onBodyDragleave");

                function Ds(t) {
                    const e = t.currentTarget;
                    e.classList.remove("dragover"), document.body.classList.remove("dragover");
                    const n = t.dataTransfer;
                    !n || !Is(n) || ((0, d.f)(e, "document:drop", {
                        transfer: n
                    }), t.stopPropagation(), t.preventDefault())
                }
                i(Ds, "onDrop");
                let Zn = !1;

                function Ns() {
                    Zn = !0
                }
                i(Ns, "onDragstart");

                function Hs() {
                    Zn = !1
                }
                i(Hs, "onDragend");
                async function Bs(t, e) {
                    const o = new TextEncoder().encode(e),
                        {
                            seal: s
                        } = await Promise.all([u.e(1947), u.e(5424)]).then(u.bind(u, 68907));
                    return s(o, t)
                }
                i(Bs, "encrypt");

                function _s(t) {
                    const e = atob(t).split("").map(n => n.charCodeAt(0));
                    return Uint8Array.from(e)
                }
                i(_s, "decode");

                function Os(t) {
                    let e = "";
                    for (const n of t) e += String.fromCharCode(n);
                    return btoa(e)
                }
                i(Os, "encode"), (0, d.on)("submit", "form.js-encrypt-submit", async function(t) {
                    const e = t.currentTarget;
                    if (t.defaultPrevented || !e.checkValidity()) return;
                    const n = e.elements.namedItem("secret_value");
                    if (n.disabled = !0, !n.value) return;
                    t.preventDefault();
                    const o = _s(e.getAttribute("data-public-key"));
                    e.elements.namedItem("encrypted_value").value = Os(await Bs(o, n.value)), e.submit()
                }), (0, d.on)("submit", "form.js-encrypt-bulk-submit", $s(!0)), (0, d.on)("submit", "form.js-encrypt-bulk-submit-enable-empty", $s(!1));

                function $s(t) {
                    return async function(e) {
                        const n = e.currentTarget;
                        if (e.defaultPrevented || !n.checkValidity()) return;
                        const o = _s(n.getAttribute("data-public-key"));
                        e.preventDefault();
                        for (const s of n.elements) {
                            const r = s;
                            if (r.id.endsWith("secret")) {
                                if (r.disabled = !0, r.required && !r.value) {
                                    const c = `${r.name} is invalid!`,
                                        l = document.querySelector("template.js-flash-template");
                                    l.after(new Et.R(l, {
                                        className: "flash-error",
                                        message: c
                                    }));
                                    return
                                }
                                const a = `${r.name}_encrypted_value`;
                                if (!r.value) {
                                    n.elements.namedItem(a).disabled = t;
                                    continue
                                }
                                n.elements.namedItem(a).value = Os(await Bs(o, r.value))
                            }
                        }
                        n.submit()
                    }
                }
                i($s, "submitBulk");
                let Ge;

                function Ze(t, e) {
                    const n = document.querySelector('.js-site-favicon[type="image/svg+xml"]'),
                        o = document.querySelector('.js-site-favicon[type="image/png"]');
                    e || (e = "light");
                    const s = e === "light" ? "" : "-dark";
                    if (n && o)
                        if (Ge == null && (Ge = n.href), t) {
                            t = t.substr(0, t.lastIndexOf(".")), t = `${t}${s}.svg`, n.href = t;
                            const r = n.href.substr(0, n.href.lastIndexOf("."));
                            o.href = `${r}.png`
                        } else {
                            const r = n.href.indexOf("-dark.svg"),
                                a = n.href.substr(0, r !== -1 ? r : n.href.lastIndexOf("."));
                            n.href = `${a}${s}.svg`, o.href = `${a}${s}.png`
                        }
                }
                i(Ze, "updateFavicon");

                function Je() {
                    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
                }
                i(Je, "prefersDarkColorScheme");

                function sc() {
                    Ge != null && Ze(Ge, Je() ? "dark" : "light")
                }
                i(sc, "resetIcon"), (0, y.N7)("[data-favicon-override]", {
                    add(t) {
                        const e = t.getAttribute("data-favicon-override");
                        setTimeout(() => Ze(e, Je() ? "dark" : "light"))
                    },
                    remove() {
                        sc()
                    }
                }), Je() && Ze(void 0, "dark"), window.matchMedia("(prefers-color-scheme: dark)").addListener(() => {
                    Ze(void 0, Je() ? "dark" : "light")
                }), (0, y.N7)(".js-feature-preview-indicator-container", t => {
                    rc(t)
                });
                async function rc(t) {
                    const e = t.getAttribute("data-feature-preview-indicator-src"),
                        n = await ic(e),
                        o = t.querySelectorAll(".js-feature-preview-indicator");
                    for (const s of o) s.hidden = !n
                }
                i(rc, "fetchFeaturePreviewIndicator");
                async function ic(t) {
                    try {
                        const e = await fetch(t, {
                            headers: {
                                Accept: "application/json"
                            }
                        });
                        return e.ok ? (await e.json()).show_indicator : !1
                    } catch {
                        return !1
                    }
                }
                i(ic, "fetchIndicator");
                var Pt = u(18137),
                    ct = u(16393);
                (0, d.on)("click", "[data-feature-preview-trigger-url]", async t => {
                    const e = t.currentTarget,
                        n = e.getAttribute("data-feature-preview-trigger-url"),
                        o = await (0, Pt.W)({
                            content: (0, ct.a)(document, n),
                            dialogClass: "feature-preview-dialog"
                        }),
                        s = e.getAttribute("data-feature-preview-close-details"),
                        r = e.getAttribute("data-feature-preview-close-hmac");
                    o.addEventListener("dialog:remove", () => {
                        (0, Lt.b)({
                            hydroEventPayload: s,
                            hydroEventHmac: r
                        }, !0)
                    });
                    const a = document.querySelectorAll(".js-feature-preview-indicator");
                    for (const c of a) c.hidden = !0
                }), (0, V.AC)(".js-feature-preview-unenroll", async (t, e) => {
                    await e.text();
                    const n = t.querySelector(".js-feature-preview-slug").value;
                    (0, d.f)(t, `feature-preview-unenroll:${n}`)
                }), (0, V.AC)(".js-feature-preview-enroll", async (t, e) => {
                    await e.text();
                    const n = t.querySelector(".js-feature-preview-slug").value;
                    (0, d.f)(t, `feature-preview-enroll:${n}`)
                });
                class Fs {
                    constructor(e, n) {
                        this.attachment = e, this.policy = n
                    }
                    async process(e) {
                        var n, o, s, r;
                        const a = window.performance.now(),
                            c = new Headers(this.policy.header || {}),
                            l = new XMLHttpRequest;
                        l.open("POST", this.policy.upload_url, !0);
                        for (const [L, T] of c) l.setRequestHeader(L, T);
                        l.onloadstart = () => {
                            e.attachmentUploadDidStart(this.attachment, this.policy)
                        }, l.upload.onprogress = L => {
                            if (L.lengthComputable) {
                                const T = Math.round(L.loaded / L.total * 100);
                                e.attachmentUploadDidProgress(this.attachment, T)
                            }
                        }, await ac(l, cc(this.attachment, this.policy)), l.status === 204 ? (Us(this.policy), e.attachmentUploadDidComplete(this.attachment, this.policy, {})) : l.status === 201 ? (Us(this.policy), e.attachmentUploadDidComplete(this.attachment, this.policy, JSON.parse(l.responseText))) : e.attachmentUploadDidError(this.attachment, {
                            status: l.status,
                            body: l.responseText
                        });
                        const E = {
                            duration: window.performance.now() - a,
                            size: (o = (n = this.attachment) == null ? void 0 : n.file) == null ? void 0 : o.size,
                            fileType: (r = (s = this.attachment) == null ? void 0 : s.file) == null ? void 0 : r.type,
                            success: l.status === 204 || l.status === 201
                        };
                        (0, Lt.b)({
                            uploadTiming: E
                        }, !0)
                    }
                }
                i(Fs, "AttachmentUpload");

                function ac(t, e) {
                    return new Promise((n, o) => {
                        t.onload = () => n(t), t.onerror = o, t.send(e)
                    })
                }
                i(ac, "send");

                function cc(t, e) {
                    const n = new FormData;
                    e.same_origin && n.append("authenticity_token", e.upload_authenticity_token);
                    for (const o in e.form) n.append(o, e.form[o]);
                    return n.append("file", t.file), n
                }
                i(cc, "uploadForm");

                function Us(t) {
                    const e = typeof t.asset_upload_url == "string" ? t.asset_upload_url : null,
                        n = typeof t.asset_upload_authenticity_token == "string" ? t.asset_upload_authenticity_token : null;
                    if (!(e && n)) return;
                    const o = new FormData;
                    o.append("authenticity_token", n), fetch(e, {
                        method: "PUT",
                        body: o,
                        credentials: "same-origin",
                        headers: {
                            Accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    })
                }
                i(Us, "markComplete");
                async function lc(t, e) {
                    const n = mc(t, e);
                    for (const o of t.attachments) {
                        const s = await uc(t, o, e);
                        if (!s) return;
                        try {
                            await new Fs(o, s).process(n)
                        } catch {
                            (0, d.f)(e, "upload:error", {
                                batch: t,
                                attachment: o
                            }), It(e, "is-failed");
                            return
                        }
                    }
                }
                i(lc, "upload");
                async function uc(t, e, n) {
                    const o = dc(e, n),
                        s = [];
                    (0, d.f)(n, "upload:setup", {
                        batch: t,
                        attachment: e,
                        form: o,
                        preprocess: s
                    });
                    try {
                        await Promise.all(s);
                        const r = await fetch(fc(o, n));
                        if (r.ok) return await r.json();
                        (0, d.f)(n, "upload:invalid", {
                            batch: t,
                            attachment: e
                        });
                        const a = await r.text(),
                            c = r.status,
                            {
                                state: l,
                                messaging: f
                            } = Ws({
                                status: c,
                                body: a
                            }, e.file);
                        It(n, l, f)
                    } catch {
                        (0, d.f)(n, "upload:invalid", {
                            batch: t,
                            attachment: e
                        }), It(n, "is-failed")
                    }
                    return null
                }
                i(uc, "validate");

                function dc(t, e) {
                    const n = e.querySelector(".js-data-upload-policy-url-csrf").value,
                        o = e.getAttribute("data-upload-repository-id"),
                        s = e.getAttribute("data-subject-type"),
                        r = e.getAttribute("data-subject-param"),
                        a = t.file,
                        c = new FormData;
                    return c.append("name", a.name), c.append("size", String(a.size)), c.append("content_type", a.type), c.append("authenticity_token", n), s && c.append("subject_type", s), r && c.append("subject", r), o && c.append("repository_id", o), t.directory && c.append("directory", t.directory), c
                }
                i(dc, "policyForm");

                function fc(t, e) {
                    return new Request(e.getAttribute("data-upload-policy-url"), {
                        method: "POST",
                        body: t,
                        credentials: "same-origin",
                        headers: {
                            Accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    })
                }
                i(fc, "policyRequest");

                function mc(t, e) {
                    return {
                        attachmentUploadDidStart(n, o) {
                            n.saving(0), It(e, "is-uploading"), (0, d.f)(e, "upload:start", {
                                batch: t,
                                attachment: n,
                                policy: o
                            })
                        },
                        attachmentUploadDidProgress(n, o) {
                            n.saving(o), (0, d.f)(e, "upload:progress", {
                                batch: t,
                                attachment: n
                            })
                        },
                        attachmentUploadDidComplete(n, o, s) {
                            n.saved(hc(s, o)), (0, d.f)(e, "upload:complete", {
                                batch: t,
                                attachment: n
                            }), t.isFinished() && It(e, "is-default")
                        },
                        attachmentUploadDidError(n, o) {
                            (0, d.f)(e, "upload:error", {
                                batch: t,
                                attachment: n
                            });
                            const {
                                state: s
                            } = Ws(o);
                            It(e, s)
                        }
                    }
                }
                i(mc, "createDelegate");

                function hc(t, e) {
                    const n = (t.id == null ? null : String(t.id)) || (e.asset.id == null ? null : String(e.asset.id)),
                        o = (typeof t.href == "string" ? t.href : null) || (typeof e.asset.href == "string" ? e.asset.href : null);
                    return {
                        id: n,
                        href: o,
                        name: e.asset.name
                    }
                }
                i(hc, "savedAttributes");

                function Ws(t, e) {
                    if (t.status === 400) return {
                        state: "is-bad-file"
                    };
                    if (t.status !== 422) return {
                        state: "is-failed"
                    };
                    const n = JSON.parse(t.body);
                    if (!n || !n.errors) return {
                        state: "is-failed"
                    };
                    for (const o of n.errors) switch (o.field) {
                        case "size": {
                            const s = e ? e.size : null;
                            return s != null && s === 0 ? {
                                state: "is-empty"
                            } : {
                                state: "is-too-big",
                                messaging: {
                                    message: pc(o.message),
                                    target: ".js-upload-too-big"
                                }
                            }
                        }
                        case "file_count":
                            return {
                                state: "is-too-many"
                            };
                        case "width":
                        case "height":
                            return {
                                state: "is-bad-dimensions"
                            };
                        case "name":
                            return o.code === "already_exists" ? {
                                state: "is-duplicate-filename"
                            } : {
                                state: "is-bad-file"
                            };
                        case "content_type":
                            return {
                                state: "is-bad-file"
                            };
                        case "uploader_id":
                            return {
                                state: "is-bad-permissions"
                            };
                        case "repository_id":
                            return {
                                state: "is-repository-required"
                            };
                        case "format":
                            return {
                                state: "is-bad-format"
                            }
                    }
                    return {
                        state: "is-failed"
                    }
                }
                i(Ws, "policyErrorState");
                const pc = i(t => t.startsWith("size") ? t.substring(5) : t, "trimSizeErrorMessage"),
                    gc = ["is-default", "is-uploading", "is-bad-file", "is-duplicate-filename", "is-too-big", "is-too-many", "is-hidden-file", "is-failed", "is-bad-dimensions", "is-empty", "is-bad-permissions", "is-repository-required", "is-bad-format"];

                function It(t, e, n) {
                    if (n) {
                        const {
                            message: o,
                            target: s
                        } = n, r = t.querySelector(s);
                        r && (r.innerHTML = o)
                    }
                    t.classList.remove(...gc), t.classList.add(e)
                }
                i(It, "resetState");
                class zs {
                    constructor(e) {
                        this.attachments = e, this.size = this.attachments.length, this.total = Jn(this.attachments, n => n.file.size)
                    }
                    percent() {
                        const e = i(o => o.file.size * o.percent / 100, "bytes"),
                            n = Jn(this.attachments, e);
                        return Math.round(n / this.total * 100)
                    }
                    uploaded() {
                        const e = i(n => n.isSaved() ? 1 : 0, "value");
                        return Jn(this.attachments, e)
                    }
                    isFinished() {
                        return this.attachments.every(e => e.isSaved())
                    }
                }
                i(zs, "Batch");

                function Jn(t, e) {
                    return t.reduce((n, o) => n + e(o), 0)
                }
                i(Jn, "sum"), (0, y.N7)("file-attachment[hover]", {
                    add(t) {
                        t.classList.add("dragover")
                    },
                    remove(t) {
                        t.classList.remove("dragover")
                    }
                }), (0, d.on)("file-attachment-accept", "file-attachment", function(t) {
                    const {
                        attachments: e
                    } = t.detail;
                    e.length === 0 && (It(t.currentTarget, "is-hidden-file"), t.preventDefault())
                }), (0, d.on)("file-attachment-accepted", "file-attachment", function(t) {
                    const e = t.currentTarget.querySelector(".drag-and-drop");
                    if (e && e.hidden) return;
                    const {
                        attachments: n
                    } = t.detail;
                    lc(new zs(n), t.currentTarget)
                });
                let Ks = 0;
                (0, y.N7)("file-attachment", {
                    add(t) {
                        Ks++ === 0 && (document.addEventListener("drop", Xs), document.addEventListener("dragover", Gs));
                        const e = t.closest("form");
                        e && e.addEventListener("reset", Zs)
                    },
                    remove(t) {
                        --Ks === 0 && (document.removeEventListener("drop", Xs), document.removeEventListener("dragover", Gs));
                        const e = t.closest("form");
                        e && e.removeEventListener("reset", Zs)
                    }
                });

                function Vs(t) {
                    return Array.from(t.types).indexOf("Files") >= 0
                }
                i(Vs, "file_attachment_hasFile");

                function Xs(t) {
                    const e = t.dataTransfer;
                    e && Vs(e) && t.preventDefault()
                }
                i(Xs, "onDocumentDrop");

                function Gs(t) {
                    const e = t.dataTransfer;
                    e && Vs(e) && t.preventDefault()
                }
                i(Gs, "onDocumentDragover");

                function Zs({
                    currentTarget: t
                }) {
                    const e = t.querySelector("file-attachment");
                    It(e, "is-default")
                }
                i(Zs, "onFormReset");
                var bc = u(93113);
                (0, d.on)("filter-input-updated", "filter-input", t => {
                    const e = t.currentTarget.input;
                    if (!(document.activeElement && document.activeElement === e)) return;
                    const {
                        count: n,
                        total: o
                    } = t.detail;
                    (0, at.x)(`Found ${n} out of ${o} ${o===1?"item":"items"}`)
                }), (0, d.on)("toggle", "details", t => {
                    setTimeout(() => yc(t.target), 0)
                }, {
                    capture: !0
                }), (0, d.on)("tab-container-changed", "tab-container", t => {
                    if (!(t.target instanceof HTMLElement)) return;
                    const {
                        relatedTarget: e
                    } = t.detail, n = t.target.querySelector("filter-input");
                    n instanceof bc.Z && n.setAttribute("aria-owns", e.id)
                }, {
                    capture: !0
                });

                function yc(t) {
                    const e = t.querySelector("filter-input");
                    e && !t.hasAttribute("open") && e.reset()
                }
                i(yc, "resetFilter");
                var df = u(22303);
                const Js = navigator.userAgent.match(/Firefox\/(\d+)/);
                Js && Number(Js[1]) < 76 && ((0, y.N7)('details-menu label[tabindex][role^="menuitem"]', t => {
                    const e = t.querySelector("input");
                    if (!e) return;
                    const n = t.classList.contains("select-menu-item"),
                        o = e.classList.contains("d-none"),
                        s = n || o || e.hidden;
                    n && e.classList.add("d-block"), o && e.classList.remove("d-none"), s && (e.classList.add("sr-only"), e.hidden = !1), t.removeAttribute("tabindex")
                }), (0, d.on)("focus", 'details-menu label[role="menuitemradio"] input, details-menu label[role="menuitemcheckbox"] input', t => {
                    const e = t.currentTarget.closest("label");
                    e.classList.contains("select-menu-item") && e.classList.add("navigation-focus"), e.classList.contains("SelectMenu-item") && e.classList.add("hx_menuitem--focus"), e.classList.contains("dropdown-item") && e.classList.add("hx_menuitem--focus"), t.currentTarget.addEventListener("blur", () => {
                        e.classList.contains("select-menu-item") && e.classList.remove("navigation-focus"), e.classList.contains("SelectMenu-item") && e.classList.remove("hx_menuitem--focus"), e.classList.contains("dropdown-item") && e.classList.remove("hx_menuitem--focus")
                    }, {
                        once: !0
                    })
                }, {
                    capture: !0
                }), (0, X.w4)("keydown", 'details-menu label[role="menuitemradio"] input, details-menu label[role="menuitemcheckbox"] input', async function(t) {
                    if (Ys(t)) t.currentTarget instanceof Element && vc(t.currentTarget);
                    else if (t.key === "Enter") {
                        const e = t.currentTarget;
                        t.preventDefault(), await (0, Ct.gJ)(), e instanceof HTMLInputElement && e.click()
                    }
                }), (0, d.on)("blur", 'details-menu label input[role="menuitemradio"], details-menu label input[role="menuitemcheckbox"]', t => {
                    Qs(t.currentTarget)
                }, {
                    capture: !0
                }), (0, X.w4)("keyup", 'details-menu label[role="menuitemradio"] input, details-menu label[role="menuitemcheckbox"] input', t => {
                    !Ys(t) || t.currentTarget instanceof Element && Qs(t.currentTarget)
                }));

                function Ys(t) {
                    return t.key === "ArrowDown" || t.key === "ArrowUp"
                }
                i(Ys, "isArrowKeys");

                function vc(t) {
                    const e = t.closest("label");
                    e.hasAttribute("data-role") || e.setAttribute("data-role", e.getAttribute("role")), t.setAttribute("role", e.getAttribute("data-role")), e.removeAttribute("role")
                }
                i(vc, "switchRoleToInputForNavigation");

                function Qs(t) {
                    const e = t.closest("label");
                    e.hasAttribute("data-role") || e.setAttribute("data-role", e.getAttribute("role")), e.setAttribute("role", e.getAttribute("data-role")), t.removeAttribute("role")
                }
                i(Qs, "switchRoleBackToOriginalState");
                var Yn = u(10555);

                function tr() {
                    (0, Yn.lA)(document) && (0, Yn.kc)(document)
                }
                i(tr, "scrollTargetIntoViewIfNeeded"), (0, Ue.Z)(tr), (0, d.on)("click", 'a[href^="#"]', function(t) {
                    const {
                        currentTarget: e
                    } = t;
                    e instanceof HTMLAnchorElement && setTimeout(tr, 0)
                });
                var ff = u(16172);
                const wc = ["flash-notice", "flash-error", "flash-message", "flash-warn"];

                function Ec(t) {
                    for (const {
                            key: e,
                            value: n
                        }
                        of wc.flatMap(pe.$1)) {
                        (0, pe.kT)(e);
                        let o;
                        try {
                            o = atob(decodeURIComponent(n))
                        } catch {
                            continue
                        }
                        t.after(new Et.R(t, {
                            className: e,
                            message: o
                        }))
                    }
                }
                i(Ec, "displayFlash"), (0, y.N7)("template.js-flash-template", {
                    constructor: HTMLTemplateElement,
                    add(t) {
                        Ec(t)
                    }
                });
                const Qn = new WeakMap;
                document.addEventListener("focus", function(t) {
                    const e = t.target;
                    e instanceof Element && !Qn.get(e) && ((0, d.f)(e, "focusin:delay"), Qn.set(e, !0))
                }, {
                    capture: !0
                }), document.addEventListener("blur", function(t) {
                    setTimeout(function() {
                        const e = t.target;
                        e instanceof Element && e !== document.activeElement && ((0, d.f)(e, "focusout:delay"), Qn.delete(e))
                    }, 200)
                }, {
                    capture: !0
                }), (0, V.AC)(".js-form-toggle-target", async function(t, e) {
                    try {
                        await e.text()
                    } catch {
                        return
                    }
                    const n = t.closest(".js-form-toggle-container");
                    n.querySelector(".js-form-toggle-target[hidden]").hidden = !1, t.hidden = !0
                });

                function Lc(t) {
                    t instanceof CustomEvent && (0, at.x)(`${t.detail} results found.`)
                }
                i(Lc, "noticeHandler"), (0, y.N7)("fuzzy-list", {
                    constructor: w,
                    subscribe: t => (0, P.RB)(t, "fuzzy-list-sorted", Lc)
                }), (0, d.on)("click", ".email-hidden-toggle", function(t) {
                    const e = t.currentTarget.nextElementSibling;
                    e instanceof HTMLElement && (e.style.display = "", e.classList.toggle("expanded"), t.preventDefault())
                });
                var mf = u(57147);
                (0, y.N7)(".js-hook-url-field", {
                    constructor: HTMLInputElement,
                    add(t) {
                        function e() {
                            const n = t.form;
                            if (!n) return;
                            let o;
                            try {
                                o = new URL(t.value)
                            } catch {}
                            const s = n.querySelector(".js-invalid-url-notice");
                            s instanceof HTMLElement && (s.hidden = !!(t.value === "" || o && /^https?:/.test(o.protocol)));
                            const r = n.querySelector(".js-insecure-url-notice");
                            r instanceof HTMLElement && o && t.value && (r.hidden = /^https:$/.test(o.protocol));
                            const a = n.querySelector(".js-ssl-hook-fields");
                            a instanceof HTMLElement && (a.hidden = !(o && o.protocol === "https:"))
                        }
                        i(e, "checkUrl"), (0, Xo.oq)(t, e), e()
                    }
                });

                function er(t) {
                    const e = document.querySelectorAll(".js-hook-event-checkbox");
                    for (const n of e) n.checked = n.matches(t)
                }
                i(er, "chooseEvents"), (0, d.on)("change", ".js-hook-event-choice", function(t) {
                    const e = t.currentTarget,
                        n = e.checked && e.value === "custom",
                        o = e.closest(".js-hook-events-field");
                    if (o && o.classList.toggle("is-custom", n), e.checked)
                        if (n) {
                            const s = document.querySelector(".js-hook-wildcard-event");
                            s.checked = !1
                        } else e.value === "push" ? er('[value="push"]') : e.value === "all" && er(".js-hook-wildcard-event")
                }), (0, d.on)("click", ".js-hook-deliveries-pagination-button", async function(t) {
                    const e = t.currentTarget;
                    e.disabled = !0;
                    const n = e.parentElement,
                        o = e.getAttribute("data-url");
                    n.before(await (0, ct.a)(document, o)), n.remove()
                }), (0, V.AC)(".js-redeliver-hook-form", async function(t, e) {
                    let n;
                    try {
                        n = await e.html()
                    } catch {
                        t.classList.add("failed");
                        return
                    }
                    document.querySelector(".js-hook-deliveries-container").replaceWith(n.html)
                });
                var hf = u(89400),
                    to = u(4463);
                const st = document.querySelector(".js-hovercard-content"),
                    Sc = (0, St.Z)(ct.a);
                let Rt, Ye = null,
                    eo, no = 0;
                const oo = 12,
                    so = 24,
                    nr = so - 7,
                    or = 16,
                    jc = 100,
                    Tc = 250;

                function Ut(t) {
                    return "Popover-message--" + t
                }
                i(Ut, "contentClass");

                function Ac(t) {
                    setTimeout(() => {
                        if (document.body && document.body.contains(t)) {
                            const e = t.querySelector("[data-hovercard-tracking]");
                            if (e) {
                                const o = e.getAttribute("data-hovercard-tracking");
                                o && (0, Yt.q)("user-hovercard-load", JSON.parse(o))
                            }
                            const n = t.querySelector("[data-hydro-view]");
                            n instanceof HTMLElement && (0, to.Fk)(n)
                        }
                    }, 500)
                }
                i(Ac, "trackLoad");

                function be() {
                    st instanceof HTMLElement && (st.style.display = "none", st.children[0].innerHTML = "", Ye = null, Rt = null)
                }
                i(be, "hideCard");

                function Cc(t) {
                    const e = t.getClientRects();
                    let n = e[0] || t.getBoundingClientRect() || {
                        top: 0,
                        left: 0,
                        height: 0,
                        width: 0
                    };
                    if (e.length > 0) {
                        for (const o of e)
                            if (o.left < no && o.right > no) {
                                n = o;
                                break
                            }
                    }
                    return n
                }
                i(Cc, "selectRectNearestMouse");

                function kc(t) {
                    const {
                        width: e,
                        height: n
                    } = st.getBoundingClientRect(), {
                        left: o,
                        top: s,
                        height: r,
                        width: a
                    } = Cc(t), c = s > n;
                    if (t.classList.contains("js-hovercard-left")) {
                        const f = o - e - oo,
                            p = s + r / 2;
                        return {
                            containerTop: c ? p - n + nr + or / 2 : p - nr - or / 2,
                            containerLeft: f,
                            contentClassSuffix: c ? "right-bottom" : "right-top"
                        }
                    } else {
                        const f = window.innerWidth - o > e,
                            p = o + a / 2,
                            E = f ? p - so : p - e + so;
                        return {
                            containerTop: c ? s - n - oo : s + r + oo,
                            containerLeft: E,
                            contentClassSuffix: c ? f ? "bottom-left" : "bottom-right" : f ? "top-left" : "top-right"
                        }
                    }
                }
                i(kc, "calculatePositions");

                function xc(t, e) {
                    if (!(st instanceof HTMLElement)) return;
                    st.style.visibility = "hidden", st.style.display = "block", e.classList.remove(Ut("bottom-left"), Ut("bottom-right"), Ut("right-top"), Ut("right-bottom"), Ut("top-left"), Ut("top-right"));
                    const {
                        containerTop: n,
                        containerLeft: o,
                        contentClassSuffix: s
                    } = kc(t);
                    e.classList.add(Ut(s)), st.style.top = `${n+window.pageYOffset}px`, st.style.left = `${o+window.pageXOffset}px`, Bc(t, st), st.style.visibility = ""
                }
                i(xc, "positionCard");

                function Mc(t, e) {
                    if (!(st instanceof HTMLElement)) return;
                    const n = st.children[0];
                    n.innerHTML = "";
                    const o = document.createElement("div");
                    for (const s of t.children) o.appendChild(s.cloneNode(!0));
                    n.appendChild(o), xc(e, n), Ac(o), st.style.display = "block"
                }
                i(Mc, "showCard");

                function qc(t) {
                    const e = t.closest("[data-hovercard-subject-tag]");
                    if (e) return e.getAttribute("data-hovercard-subject-tag");
                    const n = document.head && document.head.querySelector('meta[name="hovercard-subject-tag"]');
                    return n ? n.getAttribute("content") : null
                }
                i(qc, "determineEnclosingSubject");

                function Pc(t) {
                    const e = t.getAttribute("data-hovercard-url");
                    if (e) {
                        const n = qc(t);
                        if (n) {
                            const o = new URL(e, window.location.origin),
                                s = new URLSearchParams(o.search.slice(1));
                            return s.append("subject", n), s.append("current_path", window.location.pathname + window.location.search), o.search = s.toString(), o.toString()
                        }
                        return e
                    }
                    return ""
                }
                i(Pc, "hovercardUrlFromTarget");

                function Ic(t) {
                    const e = t.getAttribute("data-hovercard-type");
                    return e === "pull_request" || e === "issue" ? !!t.closest("[data-issue-and-pr-hovercards-enabled]") : e === "team" ? !!t.closest("[data-team-hovercards-enabled]") : e === "repository" ? !!t.closest("[data-repository-hovercards-enabled]") : e === "commit" ? !!t.closest("[data-commit-hovercards-enabled]") : e === "project" ? !!t.closest("[data-project-hovercards-enabled]") : e === "discussion" ? !!t.closest("[data-discussion-hovercards-enabled]") : e === "acv_badge" ? !!t.closest("[data-acv-badge-hovercards-enabled]") : e === "sponsors_listing" ? !!t.closest("[data-sponsors-listing-hovercards-enabled]") : !0
                }
                i(Ic, "hovercardsAreEnabledForType");
                async function Rc(t, e) {
                    if ("ontouchstart" in document) return;
                    const o = t.currentTarget;
                    if (t instanceof MouseEvent && (no = t.clientX), !(o instanceof Element) || Rt === o || o.closest(".js-hovercard-content") || !Ic(o)) return;
                    be(), Rt = o, Ye = document.activeElement;
                    const s = Pc(o);
                    let r;
                    try {
                        const a = new Promise(c => window.setTimeout(c, e, 0));
                        r = await Sc(document, s), await a
                    } catch (a) {
                        const c = a.response;
                        if (c && c.status === 404) {
                            const l = "Hovercard is unavailable";
                            o.setAttribute("aria-label", l), o.classList.add("tooltipped", "tooltipped-ne")
                        } else if (c && c.status === 410) {
                            const l = await c.clone().json();
                            o.setAttribute("aria-label", l.message), o.classList.add("tooltipped", "tooltipped-ne")
                        }
                        return
                    }
                    o === Rt && (Mc(r, o), t instanceof KeyboardEvent && st instanceof HTMLElement && st.focus())
                }
                i(Rc, "activateFn");

                function Dc(t) {
                    Rc(t, Tc)
                }
                i(Dc, "activateWithTimeoutFn");

                function ro(t) {
                    if (!!Rt) {
                        if (t instanceof MouseEvent && t.relatedTarget instanceof HTMLElement) {
                            const e = t.relatedTarget;
                            if (e.closest(".js-hovercard-content") || e.closest("[data-hovercard-url]")) return
                        } else t instanceof KeyboardEvent && Ye instanceof HTMLElement && Ye.focus();
                        be()
                    }
                }
                i(ro, "deactivateFn");

                function Nc(t) {
                    const e = Rt;
                    eo = window.setTimeout(() => {
                        Rt === e && ro(t)
                    }, jc)
                }
                i(Nc, "deactivateWithTimeoutFn");

                function sr(t) {
                    if (t instanceof KeyboardEvent) switch (t.key) {
                        case "Escape":
                            ro(t)
                    }
                }
                i(sr, "keyupFn");

                function Hc() {
                    eo && clearTimeout(eo)
                }
                i(Hc, "cancelDeactivation"), st && ((0, y.N7)("[data-hovercard-url]", {
                    subscribe: t => (0, P.qC)((0, P.RB)(t, "mouseover", Dc), (0, P.RB)(t, "mouseleave", Nc), (0, P.RB)(t, "keyup", sr))
                }), (0, y.N7)("[data-hovercard-url]", {
                    remove(t) {
                        Rt === t && be()
                    }
                }), (0, y.N7)(".js-hovercard-content", {
                    subscribe: t => (0, P.qC)((0, P.RB)(t, "mouseover", Hc), (0, P.RB)(t, "mouseleave", ro), (0, P.RB)(t, "keyup", sr))
                }), (0, d.on)("menu:activated", "details", be), window.addEventListener("statechange", be));

                function Bc(t, e) {
                    const n = t.getAttribute("data-hovercard-z-index-override");
                    n ? e.style.zIndex = n : e.style.zIndex = "100"
                }
                i(Bc, "setZIndexOverride"), async function() {
                    document.addEventListener("pjax:complete", () => (0, Yt.Y)({
                        pjax: "true"
                    })), await kt.C, (0, Yt.Y)()
                }(), (0, d.on)("click", "[data-octo-click]", function(t) {
                    const e = t.currentTarget;
                    if (!(e instanceof HTMLElement)) return;
                    const n = e.getAttribute("data-octo-click") || "",
                        o = {};
                    if (e.hasAttribute("data-ga-click")) {
                        const r = e.getAttribute("data-ga-click").split(",");
                        o.category = r[0].trim(), o.action = r[1].trim()
                    }
                    if (e.hasAttribute("data-octo-dimensions")) {
                        const s = e.getAttribute("data-octo-dimensions").split(",");
                        for (const r of s) {
                            const [a, c] = r.split(/:(.+)/);
                            a && (o[a] = c || "")
                        }
                    }(0, Yt.q)(n, o)
                }), (0, d.on)("click", "[data-hydro-click]", function(t) {
                    const e = t.currentTarget,
                        n = e.getAttribute("data-hydro-click") || "",
                        o = e.getAttribute("data-hydro-click-hmac") || "",
                        s = e.getAttribute("data-hydro-client-context") || "";
                    (0, to.$S)(n, o, s)
                }), (0, d.on)("click", "[data-optimizely-hydro-click]", function(t) {
                    const e = t.currentTarget,
                        n = e.getAttribute("data-optimizely-hydro-click") || "",
                        o = e.getAttribute("data-optimizely-hydro-click-hmac") || "";
                    (0, to.$S)(n, o, "")
                }), (0, V.AC)(".js-immediate-updates", async function(t, e) {
                    let n;
                    try {
                        n = (await e.json()).json.updateContent
                    } catch (o) {
                        o.response.json && (n = o.response.json.updateContent)
                    }
                    if (n)
                        for (const o in n) {
                            const s = n[o],
                                r = document.querySelector(o);
                            r instanceof HTMLElement && (0, xt.Of)(r, s)
                        }
                }), (0, y.N7)("[data-indeterminate]", {
                    constructor: HTMLInputElement,
                    initialize(t) {
                        t.indeterminate = !0
                    }
                });
                var _c = u(41514);

                function Oc() {
                    u.e(3723).then(u.bind(u, 73723))
                }
                i(Oc, "load"), (0, y.N7)(".js-jump-to-field", {
                    constructor: HTMLInputElement,
                    add(t) {
                        t.addEventListener("focusin", Oc, {
                            once: !0
                        }), (0, _c.Nc)(window.location.pathname)
                    }
                });
                var io = u(13178);
                let ao = !1;
                async function rr() {
                    if (ao) return;
                    ao = !0;
                    const e = {
                            contexts: document.querySelector("meta[name=github-keyboard-shortcuts]").content
                        },
                        n = `/site/keyboard_shortcuts?${new URLSearchParams(e).toString()}`,
                        o = await (0, Pt.W)({
                            content: (0, ct.a)(document, n),
                            labelledBy: "keyboard-shortcuts-heading"
                        });
                    o.style.width = "800px", o.addEventListener("dialog:remove", function() {
                        ao = !1
                    }, {
                        once: !0
                    })
                }
                i(rr, "showKeyboardShortcuts"), (0, d.on)("click", ".js-keyboard-shortcuts", rr), document.addEventListener("keydown", t => {
                    t instanceof KeyboardEvent && (!(0, As.Zf)(t) || t.target instanceof Node && (0, J.sw)(t.target) || (0, io.EL)(t) === "Shift+?" && rr())
                }), (0, y.N7)(".js-modifier-key", {
                    constructor: HTMLElement,
                    add(t) {
                        if (/Macintosh/.test(navigator.userAgent)) {
                            let e = t.textContent;
                            e && (e = e.replace(/ctrl/, "\u2318"), e = e.replace(/alt/, "\u2325"), t.textContent = e)
                        }
                    }
                }), (0, y.N7)(".js-modifier-label-key", {
                    add(t) {
                        var e;
                        let n = (e = t.textContent) == null ? void 0 : e.replace(/ctrl/i, "Ctrl");
                        !n || (/Macintosh/.test(navigator.userAgent) && (n = n.replace(/ctrl/i, "Cmd"), n = n.replace(/alt/i, "Option")), t.textContent = n)
                    }
                });

                function Qe(t) {
                    const e = t.currentTarget;
                    if (!(e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement)) return;
                    const n = parseInt(e.getAttribute("data-input-max-length") || "", 10),
                        o = parseInt(e.getAttribute("data-warning-length") || "", 10) || 5,
                        r = e.value.replace(/(\r\n|\n|\r)/g, `\r
`);
                    let a = n - r.length;
                    if (a <= 0) {
                        let p = r.substr(0, n);
                        p.endsWith("\r") ? (p = p.substr(0, n - 1), a = 1) : a = 0, e.value = p
                    }
                    const c = e.getAttribute("data-warning-text"),
                        f = e.closest(".js-length-limited-input-container").querySelector(".js-length-limited-input-warning");
                    a <= o ? (f.textContent = c.replace(new RegExp("{{remaining}}", "g"), `${a}`), f.classList.remove("d-none")) : (f.textContent = "", f.classList.add("d-none"))
                }
                i(Qe, "displayLengthWarning"), (0, y.N7)(".js-length-limited-input", {
                    add(t) {
                        t.addEventListener("input", Qe), t.addEventListener("change", Qe)
                    },
                    remove(t) {
                        t.removeEventListener("input", Qe), t.removeEventListener("change", Qe)
                    }
                }), (0, y.N7)("link[rel=prefetch-viewed]", {
                    initialize() {
                        window.requestIdleCallback(() => {
                            fetch(location.href, {
                                method: "HEAD",
                                credentials: "same-origin",
                                headers: {
                                    Purpose: "prefetch-viewed"
                                }
                            })
                        })
                    }
                }), (0, d.on)("click", ".js-member-search-filter", function(t) {
                    t.preventDefault();
                    const e = t.currentTarget.getAttribute("data-filter"),
                        o = t.currentTarget.closest("[data-filter-on]").getAttribute("data-filter-on"),
                        s = document.querySelector(".js-member-filter-field"),
                        r = s.value,
                        a = new RegExp(`${o}:(?:[a-z]|_|((').*(')))+`),
                        c = r.toString().trim().replace(a, "");
                    s.value = `${c} ${e}`.replace(/\s\s/, " ").trim(), s.focus(), (0, d.f)(s, "input")
                }), (0, d.on)("auto-check-success", ".js-new-organization-name", function(t) {
                    const e = t.target,
                        o = e.closest("dd").querySelector(".js-field-hint-name");
                    !o || (o.textContent = e.value)
                }), (0, V.AC)(".js-notice-dismiss", async function(t, e) {
                    await e.text(), t.closest(".js-notice").remove()
                }), (0, d.on)("submit", ".js-notice-dismiss-remote", async function(t) {
                    const e = t.currentTarget;
                    t.preventDefault();
                    let n;
                    try {
                        n = await fetch(e.action, {
                            method: e.method,
                            body: new FormData(e),
                            headers: {
                                Accept: "application/json",
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        })
                    } catch {
                        (0, me.v)();
                        return
                    }
                    n && !n.ok ? (0, me.v)() : e.closest(".js-notice").remove()
                });

                function $c(t) {
                    try {
                        const e = t.getBoundingClientRect();
                        if (e.height === 0 && e.width === 0 || t.style.opacity === "0" || t.style.visibility === "hidden") return !1
                    } catch {}
                    return !0
                }
                i($c, "isVisible"), (0, d.on)("click", ".js-github-dev-shortcut", function(t) {
                    t.preventDefault();
                    for (const n of document.querySelectorAll("textarea.js-comment-field"))
                        if (n.value && $c(n) && !confirm("Are you sure you want to open github.dev?")) return;
                    const e = t.currentTarget;
                    e.pathname = window.location.pathname, e.hash = window.location.hash, window.location.href = e.href
                }), (0, d.on)("click", ".js-github-dev-new-tab-shortcut", function(t) {
                    const e = t.currentTarget;
                    e.pathname = window.location.pathname, e.hash = window.location.hash
                }), (0, d.on)("click", ".js-blackbird-shortcut", function(t) {
                    const e = t.currentTarget;
                    e.pathname = window.location.pathname.split("/").slice(1, 3).join("/"), e.hash = window.location.hash
                }), (0, d.on)("click", ".js-permalink-shortcut", function(t) {
                    const e = t.currentTarget;
                    try {
                        (0, Qt.lO)(null, "", e.href + window.location.hash)
                    } catch {
                        window.location.href = e.href + window.location.hash
                    }
                    for (const n of document.querySelectorAll(".js-permalink-replaceable-link")) n instanceof HTMLAnchorElement && (n.href = n.getAttribute("data-permalink-href"));
                    t.preventDefault()
                }), (0, V.AC)(".js-permission-menu-form", async function(t, e) {
                    const n = t.querySelector(".js-permission-success"),
                        o = t.querySelector(".js-permission-error");
                    n.hidden = !0, o.hidden = !0, t.classList.add("is-loading");
                    let s;
                    try {
                        s = await e.json()
                    } catch {
                        t.classList.remove("is-loading"), o.hidden = !1;
                        return
                    }
                    t.classList.remove("is-loading"), n.hidden = !1;
                    const r = t.closest(".js-org-repo");
                    if (r) {
                        const a = s.json;
                        r.classList.toggle("with-higher-access", a.members_with_higher_access)
                    }
                }), async function() {
                    await kt.x;
                    const t = document.querySelector(".js-pjax-loader-bar");
                    if (!t) return;
                    const e = t.firstElementChild;
                    if (!(e instanceof HTMLElement)) return;
                    let n = 0,
                        o = null,
                        s = null;

                    function r() {
                        a(0), t && t.classList.add("is-loading"), o = window.setTimeout(c, 0)
                    }
                    i(r, "initiateLoader");

                    function a(f) {
                        e instanceof HTMLElement && (f === 0 && (s == null && (s = getComputedStyle(e).transition), e.style.transition = "none"), n = f, e.style.width = `${n}%`, f === 0 && (e.clientWidth, e.style.transition = s || ""))
                    }
                    i(a, "setWidth");

                    function c() {
                        n === 0 && (n = 12), a(Math.min(n + 3, 95)), o = window.setTimeout(c, 500)
                    }
                    i(c, "increment");

                    function l() {
                        o && clearTimeout(o), a(100), t && t.classList.remove("is-loading")
                    }
                    i(l, "finishLoader"), document.addEventListener("pjax:start", r), document.addEventListener("pjax:end", l)
                }();
                let co = null;
                const lo = "last_pjax_request",
                    tn = "pjax_start",
                    uo = "pjax_end";

                function Fc(t) {
                    t instanceof CustomEvent && t.detail && t.detail.url && (window.performance.mark(tn), co = t.detail.url)
                }
                i(Fc, "markPjaxStart");
                async function Uc() {
                    if (await (0, Ct.gJ)(), !window.performance.getEntriesByName(tn).length) return;
                    window.performance.mark(uo), window.performance.measure(lo, tn, uo);
                    const e = window.performance.getEntriesByName(lo).pop(),
                        n = e ? e.duration : null;
                    !n || (co && (0, Lt.b)({
                        requestUrl: co,
                        pjaxDuration: Math.round(n)
                    }), Wc())
                }
                i(Uc, "trackPjaxTiming");

                function Wc() {
                    window.performance.clearMarks(tn), window.performance.clearMarks(uo), window.performance.clearMeasures(lo)
                }
                i(Wc, "clearPjaxMarks"), "getEntriesByName" in window.performance && (document.addEventListener("pjax:start", Fc), document.addEventListener("pjax:end", Uc));
                let fo = null;
                const mo = "last_turbo_request",
                    en = "turbo_start",
                    ho = "turbo_end";

                function zc(t) {
                    var e;
                    t instanceof CustomEvent && (!((e = t.detail) == null ? void 0 : e.url) || (window.performance.mark(en), fo = t.detail.url))
                }
                i(zc, "markTurboStart");
                async function Kc() {
                    if (await (0, Ct.gJ)(), !window.performance.getEntriesByName(en).length) return;
                    window.performance.mark(ho), window.performance.measure(mo, en, ho);
                    const e = window.performance.getEntriesByName(mo).pop(),
                        n = e ? e.duration : null;
                    !n || (fo && (0, Lt.b)({
                        requestUrl: fo,
                        turboDuration: Math.round(n)
                    }), Vc())
                }
                i(Kc, "trackTurboTiming");

                function Vc() {
                    window.performance.clearMarks(en), window.performance.clearMarks(ho), window.performance.clearMeasures(mo)
                }
                i(Vc, "clearTurboMarks"), "getEntriesByName" in window.performance && (document.addEventListener("turbo:before-fetch-request", zc), document.addEventListener("turbo:render", Kc));
                var gf = u(82161),
                    bf = u(49602);

                function Xc(t, e) {
                    const n = t.split("/", 3).join("/"),
                        o = e.split("/", 3).join("/");
                    return n === o
                }
                i(Xc, "isSameRepo"), (0, d.on)("pjax:click", "#js-repo-pjax-container a[href]", function(t) {
                    const e = t.currentTarget.pathname;
                    Xc(e, location.pathname) || t.preventDefault()
                }), (0, d.on)("pjax:click", ".js-comment-body", function(t) {
                    const e = t.target;
                    e instanceof HTMLAnchorElement && e.pathname.split("/")[3] === "files" && t.preventDefault()
                });
                var yf = u(95126),
                    vf = u(27525),
                    wf = u(46547),
                    ye = u(14448),
                    Dt = u(16761);
                (0, d.on)("click", "[data-pjax] a, a[data-pjax]", function(t) {
                    const e = t.currentTarget;
                    if (e instanceof HTMLAnchorElement) {
                        if (e.getAttribute("data-skip-pjax") != null || e.getAttribute("data-remote") != null) return;
                        const n = (0, ye.W)(e);
                        n && Gc(t, {
                            container: n,
                            scrollTo: (0, ye.r)(e)
                        })
                    }
                }), (0, d.on)("change", "select[data-pjax]", function(t) {
                    if ((0, Dt.c)("PJAX_DISABLED") || (0, Dt.c)("TURBO")) return;
                    const e = t.currentTarget,
                        n = (0, ye.W)(e);
                    n && (0, he.ZP)({
                        url: e.value,
                        container: n
                    })
                });

                function Gc(t, e) {
                    if ((0, Dt.c)("PJAX_DISABLED") || (0, Dt.c)("TURBO")) return;
                    const n = t.currentTarget;
                    if (t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || location.protocol !== n.protocol || location.hostname !== n.hostname || n.href.indexOf("#") > -1 && ir(n) === ir(location) || t.defaultPrevented) return;
                    const o = {
                            url: n.href,
                            target: n,
                            ...e
                        },
                        s = new CustomEvent("pjax:click", {
                            bubbles: !0,
                            cancelable: !0,
                            detail: {
                                options: o,
                                relatedEvent: t
                            }
                        });
                    n.dispatchEvent(s) && ((0, he.ZP)(o), t.preventDefault(), n.dispatchEvent(new CustomEvent("pjax:clicked", {
                        bubbles: !0,
                        cancelable: !0,
                        detail: {
                            options: o
                        }
                    })))
                }
                i(Gc, "click");

                function ir(t) {
                    return t.href.replace(/#.*/, "")
                }
                i(ir, "stripHash"), (0, d.on)("submit", "form[data-pjax]", function(t) {
                    if ((0, Dt.c)("PJAX_DISABLED") || (0, Dt.c)("TURBO")) return;
                    const e = t.currentTarget,
                        n = (0, ye.W)(e);
                    if (!n) return;
                    const o = (0, ye.r)(e),
                        s = {
                            type: (e.method || "GET").toUpperCase(),
                            url: e.action,
                            target: e,
                            scrollTo: o,
                            container: n
                        };
                    if (s.type === "GET") {
                        if (e.querySelector("input[type=file]")) return;
                        const r = Zc(s.url);
                        r.search += (r.search ? "&" : "") + (0, J.qC)(e), s.url = r.toString()
                    } else s.data = new FormData(e);
                    (0, he.ZP)(s), t.preventDefault()
                });

                function Zc(t) {
                    const e = document.createElement("a");
                    return e.href = t, e
                }
                i(Zc, "parseURL"), (0, y.N7)("body.js-print-popup", () => {
                    window.print(), setTimeout(window.close, 1e3)
                }), (0, y.N7)("poll-include-fragment[data-redirect-url]", function(t) {
                    const e = t.getAttribute("data-redirect-url");
                    t.addEventListener("load", function() {
                        window.location.href = e
                    })
                }), (0, y.N7)("poll-include-fragment[data-reload]", function(t) {
                    t.addEventListener("load", function() {
                        window.location.reload()
                    })
                });
                var Jc = u(40411),
                    Yc = u(99510);
                const Qc = "$__",
                    ar = document.querySelector("meta[name=js-proxy-site-detection-payload]"),
                    cr = document.querySelector("meta[name=expected-hostname]");
                if (ar instanceof HTMLMetaElement && cr instanceof HTMLMetaElement && (0, Jc.Z)(document)) {
                    const t = {
                            url: window.location.href,
                            expectedHostname: cr.content,
                            documentHostname: document.location.hostname,
                            proxyPayload: ar.content
                        },
                        e = new Error,
                        n = {};
                    n[`${Qc}`] = btoa(JSON.stringify(t)), (0, Yc.eK)(e, n)
                }(0, X.w4)("keydown", ".js-quick-submit", function(t) {
                    tl(t)
                });

                function tl(t) {
                    const e = t.target;
                    if ((t.ctrlKey || t.metaKey) && t.key === "Enter") {
                        const n = e.form,
                            o = n.querySelector("input[type=submit], button[type=submit]");
                        if (t.shiftKey) {
                            const s = n.querySelector(".js-quick-submit-alternative");
                            (s instanceof HTMLInputElement || s instanceof HTMLButtonElement) && !s.disabled && (0, J.Bt)(n, s)
                        } else(o instanceof HTMLInputElement || o instanceof HTMLButtonElement) && o.disabled || (0, J.Bt)(n);
                        t.preventDefault()
                    }
                }
                i(tl, "quickSubmit");
                var lr = u(21335);
                let nn;
                (0, y.N7)(".js-comment-quote-reply", function(t) {
                    var e;
                    t.hidden = ((e = t.closest(".js-quote-selection-container")) == null ? void 0 : e.querySelector(".js-inline-comment-form-container textarea, .js-new-comment-form textarea")) == null
                });

                function ur(t) {
                    return t.nodeName === "DIV" && t.classList.contains("highlight")
                }
                i(ur, "isHighlightContainer");

                function el(t) {
                    return t.nodeName === "IMG" || t.firstChild != null
                }
                i(el, "hasContent");
                const dr = {
                    PRE(t) {
                        const e = t.parentElement;
                        if (e && ur(e)) {
                            const n = e.className.match(/highlight-source-(\S+)/),
                                o = n ? n[1] : "",
                                s = (t.textContent || "").replace(/\n+$/, "");
                            t.textContent = `\`\`\`${o}
${s}
\`\`\``, t.append(`

`)
                        }
                        return t
                    },
                    A(t) {
                        const e = t.textContent || "";
                        return t.classList.contains("user-mention") || t.classList.contains("team-mention") || t.classList.contains("issue-link") && /^#\d+$/.test(e) ? e : t
                    },
                    IMG(t) {
                        const e = t.getAttribute("alt");
                        return e && t.classList.contains("emoji") ? e : t
                    },
                    DIV(t) {
                        if (t.classList.contains("js-suggested-changes-blob")) t.remove();
                        else if (t.classList.contains("blob-wrapper-embedded")) {
                            const e = t.parentElement,
                                n = e.querySelector("a[href]"),
                                o = document.createElement("p");
                            o.textContent = n.href, e.replaceWith(o)
                        }
                        return t
                    }
                };

                function nl(t) {
                    const e = document.createNodeIterator(t, NodeFilter.SHOW_ELEMENT, {
                            acceptNode(s) {
                                return s.nodeName in dr && el(s) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
                            }
                        }),
                        n = [];
                    let o = e.nextNode();
                    for (; o;) o instanceof HTMLElement && n.push(o), o = e.nextNode();
                    n.reverse();
                    for (const s of n) s.replaceWith(dr[s.nodeName](s))
                }
                i(nl, "insertMarkdownSyntax"), (0, d.on)("click", ".js-comment-quote-reply", function({
                    isTrusted: t,
                    currentTarget: e
                }) {
                    const n = e.closest(".js-comment"),
                        o = n.querySelector(".js-comment-body"),
                        s = n.querySelector(".js-comment-body").cloneNode(!0),
                        r = n.closest(".js-quote-selection-container"),
                        a = o.querySelectorAll("button.js-convert-to-issue-button, span.js-clear");
                    for (const f of a) f.remove();
                    let c = new lr.p;
                    if (!t && c.range.collapsed || (r.hasAttribute("data-quote-markdown") && (c = new lr.I(r.getAttribute("data-quote-markdown") || "", f => {
                            const p = c.range.startContainer.parentElement,
                                E = p && p.closest("pre");
                            if (E instanceof HTMLElement) {
                                const L = E.parentElement;
                                if (L && ur(L)) {
                                    const T = document.createElement("div");
                                    T.className = L.className, T.appendChild(f), f.appendChild(T)
                                }
                            }
                            nl(f)
                        })), nn && o.contains(nn.anchorNode) ? c.range = nn.range : c.range.collapsed && c.select(o), c.closest(".js-quote-selection-container") !== r)) return;
                    const l = c.range;
                    r.dispatchEvent(new CustomEvent("quote-selection", {
                        bubbles: !0,
                        detail: c
                    })), c.range = l;
                    for (const f of r.querySelectorAll("textarea"))
                        if ((0, Fe.Z)(f)) {
                            c.insert(f);
                            break
                        } n.querySelector(".js-comment-body").replaceWith(s)
                });
                let po;
                document.addEventListener("selectionchange", (0, te.D)(function() {
                    const t = window.getSelection();
                    let e;
                    try {
                        e = t.getRangeAt(0)
                    } catch {
                        po = null;
                        return
                    }
                    po = {
                        anchorNode: t.anchorNode,
                        range: e
                    }
                }, 100)), document.addEventListener("toggle", () => {
                    nn = po
                }, {
                    capture: !0
                }), (0, V.AC)(".js-pick-reaction", async function(t, e) {
                    const n = await e.json(),
                        o = t.closest(".js-comment"),
                        s = o.querySelector(".js-reactions-container"),
                        r = o.querySelector(".js-comment-header-reaction-button"),
                        a = (0, wt.r)(document, n.json.reactions_container.trim()),
                        c = (0, wt.r)(document, n.json.comment_header_reaction_button.trim());
                    s.replaceWith(a), r.replaceWith(c)
                });

                function fr(t) {
                    const e = t.target,
                        n = e.getAttribute("data-reaction-label"),
                        s = e.closest(".js-add-reaction-popover").querySelector(".js-reaction-description");
                    s.hasAttribute("data-default-text") || s.setAttribute("data-default-text", s.textContent || ""), s.textContent = n
                }
                i(fr, "showReactionContent");

                function mr(t) {
                    const n = t.target.closest(".js-add-reaction-popover").querySelector(".js-reaction-description"),
                        o = n.getAttribute("data-default-text");
                    o && (n.textContent = o)
                }
                i(mr, "hideReactionContent"), (0, d.on)("toggle", ".js-reaction-popover-container", function(t) {
                    const e = t.currentTarget.hasAttribute("open");
                    for (const n of t.target.querySelectorAll(".js-reaction-option-item")) e ? (n.addEventListener("mouseenter", fr), n.addEventListener("mouseleave", mr)) : (n.removeEventListener("mouseenter", fr), n.removeEventListener("mouseleave", mr))
                }, {
                    capture: !0
                });
                var go = u(27316),
                    hr = u(79030);

                function ol(t, e, n) {
                    t.getAttribute("data-type") === "json" && n.headers.set("Accept", "application/json"), (0, d.f)(t, "deprecatedAjaxSend", {
                        request: n
                    }), e.text().catch(s => {
                        if (s.response) return s.response;
                        throw s
                    }).then(s => {
                        s.status < 300 ? (0, d.f)(t, "deprecatedAjaxSuccess") : (0, d.f)(t, "deprecatedAjaxError", {
                            error: s.statusText,
                            status: s.status,
                            text: s.text
                        })
                    }, s => {
                        (0, d.f)(t, "deprecatedAjaxError", {
                            error: s.message,
                            status: 0,
                            text: null
                        })
                    }).then(() => {
                        (0, d.f)(t, "deprecatedAjaxComplete")
                    })
                }
                i(ol, "submitWithLegacyEvents"), (0, d.on)("click", ["form button:not([type])", "form button[type=submit]", "form input[type=submit]"].join(", "), function(t) {
                    const e = t.currentTarget;
                    e.form && !t.defaultPrevented && (0, go.j)(e)
                }), (0, V.AC)("form[data-remote]", ol), (0, d.on)("deprecatedAjaxComplete", "form", function({
                    currentTarget: t
                }) {
                    const e = (0, go.u)(t);
                    e && e.remove()
                }), (0, V.uT)(t => {
                    const e = (0, go.u)(t);
                    e && e.remove()
                }), (0, V.rK)(hr.Z);
                var sl = Object.defineProperty,
                    rl = Object.getOwnPropertyDescriptor,
                    ve = i((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? rl(e, n) : e, r = t.length - 1, a; r >= 0; r--)(a = t[r]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && sl(e, n, s), s
                    }, "remote_pagination_element_decorateClass");
                let oe = i(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.loaderWasFocused = !1
                    }
                    connectedCallback() {
                        this.setPaginationUrl(this.list)
                    }
                    get hasNextPage() {
                        return !this.form.hidden
                    }
                    loadNextPage() {
                        !this.hasNextPage || (0, J.Bt)(this.form)
                    }
                    get disabled() {
                        return this.submitButton.hasAttribute("aria-disabled")
                    }
                    set disabled(t) {
                        t ? this.submitButton.setAttribute("aria-disabled", "true") : this.submitButton.removeAttribute("aria-disabled"), this.submitButton.classList.toggle("disabled", t)
                    }
                    loadstart(t) {
                        t.target.addEventListener("focus", () => {
                            this.loaderWasFocused = !0
                        }, {
                            once: !0
                        }), t.target.addEventListener("include-fragment-replaced", () => {
                            var e;
                            this.setPaginationUrl(this.list), this.loaderWasFocused && ((e = this.focusMarkers.pop()) == null || e.focus()), this.loaderWasFocused = !1
                        }, {
                            once: !0
                        })
                    }
                    async submit(t) {
                        var e;
                        if (t.preventDefault(), this.disabled) return;
                        this.disabled = !0;
                        let n;
                        try {
                            const s = await fetch(this.form.action);
                            if (!s.ok) return;
                            n = await s.text()
                        } catch {
                            return
                        }
                        const o = (0, wt.r)(document, n);
                        this.setPaginationUrl(o), this.list.append(o), (e = this.focusMarkers.pop()) == null || e.focus(), this.disabled = !1, this.dispatchEvent(new CustomEvent("remote-pagination-load"))
                    }
                    setPaginationUrl(t) {
                        const e = t.querySelector("[data-pagination-src]");
                        if (!e) return;
                        const n = e.getAttribute("data-pagination-src");
                        n ? (this.form.action = n, this.form.hidden = !1) : this.form.hidden = !0
                    }
                }, "RemotePaginationElement");
                ve([q.fA], oe.prototype, "form", 2), ve([q.fA], oe.prototype, "list", 2), ve([q.GO], oe.prototype, "focusMarkers", 2), ve([q.fA], oe.prototype, "submitButton", 2), oe = ve([q.Ih], oe), (0, y.N7)(".has-removed-contents", function() {
                    let t;
                    return {
                        add(e) {
                            t = Array.from(e.childNodes);
                            for (const o of t) e.removeChild(o);
                            const n = e.closest("form");
                            n && (0, d.f)(n, "change")
                        },
                        remove(e) {
                            for (const o of t) e.appendChild(o);
                            const n = e.closest("form");
                            n && (0, d.f)(n, "change")
                        }
                    }
                });
                var se = u(28933),
                    il = (t => (t.Auto = "auto", t.Light = "light", t.Dark = "dark", t))(il || {});

                function al() {
                    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
                }
                i(al, "getUserSystemColorMode");
                const bo = ".js-render-plaintext";

                function cl(t) {
                    const e = t.closest(".js-render-needs-enrichment");
                    if (!e) return;
                    e.querySelector(bo) && yo(e, !1)
                }
                i(cl, "markdownEnrichmentSuccess");

                function ll(t) {
                    var e;
                    const n = (e = t.parentElement) == null ? void 0 : e.closest(".js-render-needs-enrichment");
                    if (!n) return;
                    yo(n, !1);
                    const o = n.querySelector(bo);
                    if (!o) return;
                    const s = o.querySelector("pre"),
                        r = se.dy`
    <div class="flash flash-error mb-4">Error rendering markdown</div>
    ${s}
  `;
                    n.classList.add("render-error"), o.classList.remove("render-plaintext-hidden"), (0, se.sY)(r, o)
                }
                i(ll, "markdownEnrichmentFailed");

                function yo(t, e) {
                    const n = t.getElementsByClassName("js-render-enrichment-loader")[0],
                        o = t.getElementsByClassName("render-expand")[0];
                    n && (n.hidden = !e), o && (o.hidden = e)
                }
                i(yo, "setCodeBlockLoaderVisibility");

                function ul(t, e) {
                    const n = t.querySelector(bo);
                    e ? n.classList.remove("render-plaintext-hidden") : n.classList.add("render-plaintext-hidden")
                }
                i(ul, "setRawCodeBlockVisibility");
                class pr {
                    constructor(e) {
                        this.el = e, this.enrichmentTarget = e.getElementsByClassName("js-render-enrichment-target")[0], this.iframeUrl = this.getIframeUrl(), this.identifier = this.el.getAttribute("data-identity"), this.iframeContentType = this.el.getAttribute("data-type"), this.iframeOrigin = new URL(this.iframeUrl, window.location.origin).origin, this.iframeContent = this.el.getAttribute("data-content"), yo(this.el, !0)
                    }
                    enrich() {
                        const e = this.createDialog();
                        (0, se.sY)(e, this.enrichmentTarget), this.setupModal()
                    }
                    getIframeUrl() {
                        const e = this.el.getAttribute("data-src"),
                            n = {
                                ...this.colorMode()
                            },
                            o = Object.entries(n).map(([s, r]) => `${s}=${r}`).join("&");
                        return `${e}?${o}`
                    }
                    colorMode() {
                        var e;
                        let n = (e = document.querySelector("html")) == null ? void 0 : e.getAttribute("data-color-mode");
                        return (n === "auto" || !n) && (n = al()), {
                            color_mode: n
                        }
                    }
                    setupModal() {
                        const e = this.generateIframeCode("-fullscreen"),
                            n = this.el.querySelector(".Box-body");
                        this.el.querySelector(".js-full-screen-render").addEventListener("click", () => {
                            (0, se.sY)(e, n)
                        })
                    }
                    createDialog() {
                        const e = this.generateIframeCode();
                        return se.dy` <div class="d-flex flex-column flex-auto js-render-box">
      <details class="details-reset details-overlay details-overlay-dark">
        <summary class="btn-sm btn position-absolute js-full-screen-render render-expand" aria-haspopup="dialog" hidden>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="octicon"
            style="display:inline-block;vertical-align:text-bottom"
          >
            <path
              fill-rule="evenodd"
              d="M3.72 3.72a.75.75 0 011.06 1.06L2.56 7h10.88l-2.22-2.22a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.22-2.22H2.56l2.22 2.22a.75.75 0 11-1.06 1.06l-3.5-3.5a.75.75 0 010-1.06l3.5-3.5z"
            ></path>
          </svg>
        </summary>
        <details-dialog class="Box Box--overlay render-full-screen d-flex flex-column anim-fade-in fast">
          <div>
            <button
              aria-label="Close dialog"
              data-close-dialog=""
              type="button"
              data-view-component="true"
              class="Link--muted btn-link position-absolute render-full-screen-close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                style="display:inline-block;vertical-align:text-bottom"
                class="octicon octicon-x"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"
                ></path>
              </svg>
            </button>
            <div class="Box-body"></div>
          </div>
        </details-dialog>
      </details>
      ${e}
    </div>`
                    }
                    generateIframeCode(e = "") {
                        const n = this.identifier + e,
                            o = `${this.iframeUrl}#${n}`;
                        return se.dy`
      <div
        class="render-container js-render-target p-0"
        data-identity="${n}"
        data-host="${this.iframeOrigin}"
        data-type="${this.iframeContentType}"
      >
        <iframe
          class="render-viewer"
          src="${o}"
          name="${n}"
          data-content="${this.iframeContent}"
          sandbox="allow-scripts allow-same-origin allow-top-navigation"
        >
        </iframe>
      </div>
    `
                    }
                }
                i(pr, "EnrichableMarkdownRenderer"), (0, y.N7)(".js-render-needs-enrichment", function(t) {
                    const e = t;
                    new pr(e).enrich()
                }), (0, d.on)("preview:toggle:off", ".js-previewable-comment-form", function(t) {
                    const n = t.currentTarget.querySelector(".js-render-needs-enrichment"),
                        o = n == null ? void 0 : n.querySelector(".js-render-enrichment-target");
                    !o || (o.innerHTML = "")
                }), (0, d.on)("preview:rendered", ".js-previewable-comment-form", function(t) {
                    const n = t.currentTarget.querySelector(".js-render-needs-enrichment");
                    n && ul(n, !1)
                });
                const Ef = null,
                    on = ["is-render-pending", "is-render-ready", "is-render-loading", "is-render-loaded"],
                    dl = ["is-render-ready", "is-render-loading", "is-render-loaded", "is-render-failed", "is-render-failed-fatally"],
                    re = new WeakMap;

                function gr(t) {
                    const e = re.get(t);
                    e != null && (e.load = e.hello = null, e.helloTimer && (clearTimeout(e.helloTimer), e.helloTimer = null), e.loadTimer && (clearTimeout(e.loadTimer), e.loadTimer = null))
                }
                i(gr, "resetTiming");

                function sn(t) {
                    t.classList.remove(...on), t.classList.add("is-render-failed"), ll(t), gr(t)
                }
                i(sn, "renderFailed");

                function br(t, e = !1) {
                    var n;
                    !(0, Fe.Z)(t) || t.classList.contains("is-render-ready") || t.classList.contains("is-render-failed") || t.classList.contains("is-render-failed-fatally") || e && !((n = re.get(t)) == null ? void 0 : n.hello) || sn(t)
                }
                i(br, "timeoutWatchdog"), (0, y.N7)(".js-render-target", function(t) {
                    var e;
                    const n = t;
                    n.classList.remove(...dl), n.style.height = "auto", !((e = re.get(t)) == null ? void 0 : e.load) && (gr(t), !re.get(t) && (re.set(t, {
                        load: Date.now(),
                        hello: null,
                        helloTimer: window.setTimeout(br, 1e4, t, !0),
                        loadTimer: window.setTimeout(br, 45e3, t)
                    }), t.classList.add("is-render-automatic", "is-render-requested")))
                });

                function vo(t, e) {
                    t && t.postMessage && t.postMessage(JSON.stringify(e), "*")
                }
                i(vo, "postAsJson"), window.addEventListener("message", function(t) {
                    let e = t.data;
                    if (!e) return;
                    if (typeof e == "string") try {
                        e = JSON.parse(e)
                    } catch {
                        return
                    }
                    if (typeof e.type != "string" && e.type !== "render" || typeof e.identity != "string") return;
                    const n = e.identity;
                    if (typeof e.body != "string") return;
                    const o = e.body;
                    let s;
                    for (const f of document.querySelectorAll(".js-render-target"))
                        if (f.getAttribute("data-identity") === n) {
                            s = f;
                            break
                        } if (!s || t.origin !== s.getAttribute("data-host")) return;
                    const r = e.payload != null ? e.payload : void 0,
                        a = s.querySelector("iframe"),
                        c = a == null ? void 0 : a.contentWindow;

                    function l() {
                        const f = a == null ? void 0 : a.getAttribute("data-content");
                        if (!f) return;
                        const p = {
                            type: "render:cmd",
                            body: {
                                cmd: "code_rendering_service:data:ready",
                                "code_rendering_service:data:ready": JSON.parse(f)
                            }
                        };
                        vo(c, p)
                    }
                    switch (i(l, "postData"), o) {
                        case "hello": {
                            const f = re.get(s) || {
                                untimed: !0
                            };
                            f.hello = Date.now();
                            const p = {
                                    type: "render:cmd",
                                    body: {
                                        cmd: "ack",
                                        ack: !0
                                    }
                                },
                                E = {
                                    type: "render:cmd",
                                    body: {
                                        cmd: "branding",
                                        branding: !1
                                    }
                                };
                            if (!c) return;
                            vo(c, p), vo(c, E)
                        }
                        break;
                        case "error":
                            sn(s);
                            break;
                        case "error:fatal": {
                            sn(s), s.classList.add("is-render-failed-fatal");
                            break
                        }
                        case "error:invalid":
                            sn(s), s.classList.add("is-render-failed-invalid");
                            break;
                        case "loading":
                            s.classList.remove(...on), s.classList.add("is-render-loading");
                            break;
                        case "loaded":
                            s.classList.remove(...on), s.classList.add("is-render-loaded");
                            break;
                        case "ready":
                            cl(s), s.classList.remove(...on), s.classList.add("is-render-ready"), r && typeof r.height == "number" && (s.style.height = `${r.height}px`);
                            break;
                        case "resize":
                            r && typeof r.height == "number" && (s.style.height = `${r.height}px`);
                            break;
                        case "code_rendering_service:markdown:get_data":
                            if (!c) return;
                            l();
                            break;
                        default:
                            break
                    }
                }), (0, V.AC)("form[data-replace-remote-form]", async function(t, e) {
                    t.classList.remove("is-error"), t.classList.add("is-loading");
                    try {
                        let n = t;
                        const o = await e.html(),
                            s = t.closest("[data-replace-remote-form-target]");
                        if (s) {
                            const r = s.getAttribute("data-replace-remote-form-target");
                            n = r ? document.getElementById(r) : s
                        }
                        n.replaceWith(o.html)
                    } catch {
                        t.classList.remove("is-loading"), t.classList.add("is-error")
                    }
                }), PerformanceObserver && (PerformanceObserver.supportedEntryTypes || []).includes("longtask") && new PerformanceObserver(function(e) {
                    const n = e.getEntries().map(({
                        name: o,
                        duration: s
                    }) => ({
                        name: o,
                        duration: s,
                        url: window.location.href
                    }));
                    (0, Lt.b)({
                        longTasks: n
                    })
                }).observe({
                    entryTypes: ["longtask"]
                });
                const yr = new WeakMap;

                function fl(t) {
                    return t.closest("markdown-toolbar").field
                }
                i(fl, "getTextarea"), (0, d.on)("click", ".js-markdown-link-button", async function({
                    currentTarget: t
                }) {
                    const n = document.querySelector(".js-markdown-link-dialog").content.cloneNode(!0);
                    if (!(n instanceof DocumentFragment)) return;
                    const o = await (0, Pt.W)({
                        content: n,
                        labelledBy: "box-title"
                    });
                    t instanceof HTMLElement && yr.set(o, fl(t).selectionEnd)
                }), (0, d.on)("click", ".js-markdown-link-insert", ({
                    currentTarget: t
                }) => {
                    const e = t.closest("details-dialog"),
                        n = document.querySelector(`#${t.getAttribute("data-for-textarea")}`),
                        o = yr.get(e) || 0,
                        s = e.querySelector("#js-dialog-link-href").value,
                        a = `[${e.querySelector("#js-dialog-link-text").value}](${s}) `,
                        c = n.value.slice(0, o),
                        l = n.value.slice(o);
                    n.value = c + a + l, n.focus(), n.selectionStart = n.selectionEnd = o + a.length
                });
                var Lf = u(30254);
                (0, d.on)("details-menu-select", ".js-saved-reply-menu", function(t) {
                    if (!(t.target instanceof Element)) return;
                    const e = t.detail.relatedTarget.querySelector(".js-saved-reply-body");
                    if (!e) return;
                    const n = (e.textContent || "").trim(),
                        s = t.target.closest(".js-previewable-comment-form").querySelector("textarea.js-comment-field");
                    (0, ne.Om)(s, n), setTimeout(() => s.focus(), 0)
                }, {
                    capture: !0
                }), (0, X.w4)("keydown", ".js-saved-reply-shortcut-comment-field", function(t) {
                    (0, io.EL)(t) === "Control+." && (t.target.closest(".js-previewable-comment-form").querySelector(".js-saved-reply-container").setAttribute("open", ""), t.preventDefault())
                }), (0, X.w4)("keydown", ".js-saved-reply-filter-input", function(t) {
                    if (/^Control\+[1-9]$/.test((0, io.EL)(t))) {
                        const n = t.target.closest(".js-saved-reply-container").querySelectorAll('[role="menuitem"]'),
                            o = Number(t.key),
                            s = n[o - 1];
                        s instanceof HTMLElement && (s.click(), t.preventDefault())
                    } else if (t.key === "Enter") {
                        const n = t.target.closest(".js-saved-reply-container").querySelectorAll('[role="menuitem"]');
                        n.length > 0 && n[0] instanceof HTMLButtonElement && n[0].click(), t.preventDefault()
                    }
                });

                function ml(t, e) {
                    return t.querySelector(`#LC${e}`)
                }
                i(ml, "scanning_queryLineElement");

                function hl(t, e) {
                    const n = Yo(t, o => ml(e, o));
                    if (n) {
                        const o = document.createElement("span"),
                            s = ["text-bold", "hx_keyword-hl", "rounded-2", "d-inline-block"];
                        o.classList.add(...s), os(n, o)
                    }
                }
                i(hl, "highlightColumns");

                function pl(t) {
                    const e = parseInt(t.getAttribute("data-start-line")),
                        n = parseInt(t.getAttribute("data-end-line")),
                        o = parseInt(t.getAttribute("data-start-column")),
                        s = parseInt(t.getAttribute("data-end-column"));
                    return e !== n || e === n && o === s ? null : {
                        start: {
                            line: e,
                            column: o
                        },
                        end: {
                            line: n,
                            column: s !== 0 ? s : null
                        }
                    }
                }
                i(pl, "parseColumnHighlightRange"), (0, y.N7)(".js-highlight-code-snippet-columns", function(t) {
                    const e = pl(t);
                    e !== null && hl(e, t)
                }), (0, d.on)("click", ".js-segmented-nav-button", function(t) {
                    t.preventDefault();
                    const e = t.currentTarget,
                        n = e.getAttribute("data-selected-tab"),
                        o = e.closest(".js-segmented-nav"),
                        s = o.parentElement;
                    for (const r of o.querySelectorAll(".js-segmented-nav-button")) r.classList.remove("selected");
                    e.classList.add("selected");
                    for (const r of s.querySelectorAll(".js-selected-nav-tab")) r.parentElement === s && r.classList.remove("active");
                    document.querySelector(`.${n}`).classList.add("active")
                });
                var jt = u(75169);

                function Nt(t) {
                    const e = t || window.location,
                        n = document.head && document.head.querySelector("meta[name=session-resume-id]");
                    return n instanceof HTMLMetaElement && n.content || e.pathname
                }
                i(Nt, "getPageID");
                const gl = (0, te.D)(function() {
                    (0, jt.e6)(Nt())
                }, 50);
                window.addEventListener("submit", jt.iO, {
                    capture: !0
                }), window.addEventListener("pageshow", function() {
                    (0, jt.e6)(Nt())
                }), window.addEventListener("pjax:end", function() {
                    (0, jt.e6)(Nt())
                }), (0, y.N7)(".js-session-resumable", function() {
                    gl()
                }), window.addEventListener("pagehide", function() {
                    (0, jt.Xm)(Nt(), {
                        selector: ".js-session-resumable"
                    })
                }), window.addEventListener("pjax:beforeReplace", function(t) {
                    const e = t.detail.previousState,
                        n = e ? e.url : null;
                    if (n)(0, jt.Xm)(Nt(new URL(n, window.location.origin)), {
                        selector: ".js-session-resumable"
                    });
                    else {
                        const o = new Error("pjax:beforeReplace event.detail.previousState.url is undefined");
                        setTimeout(function() {
                            throw o
                        })
                    }
                });
                var Sf = u(94528),
                    rn = u(16267);
                const wo = ["notification_referrer_id", "notifications_before", "notifications_after", "notifications_query"],
                    an = "notification_shelf";

                function bl(t, e = null) {
                    return t.has("notification_referrer_id") ? (vl(t, e), wl(t)) : null
                }
                i(bl, "storeAndStripShelfParams");

                function yl(t = null) {
                    const e = vr(t);
                    if (!e) return (0, rn.cl)(an), null;
                    try {
                        const n = (0, rn.rV)(an);
                        if (!n) return null;
                        const o = JSON.parse(n);
                        if (!o || !o.pathname) throw new Error("Must have a pathname");
                        if (o.pathname !== e) throw new Error("Stored pathname does not match current pathname.");
                        const s = {};
                        for (const r of wo) s[r] = o[r];
                        return s
                    } catch {
                        return (0, rn.cl)(an), null
                    }
                }
                i(yl, "getStoredShelfParamsForCurrentPage");

                function vl(t, e) {
                    const n = vr(e);
                    if (!n) return;
                    const o = {
                        pathname: n
                    };
                    for (const s of wo) {
                        const r = t.get(s);
                        r && (o[s] = r)
                    }(0, rn.LS)(an, JSON.stringify(o))
                }
                i(vl, "storeShelfParams");

                function wl(t) {
                    for (const e of wo) t.delete(e);
                    return t
                }
                i(wl, "deleteShelfParams");

                function vr(t) {
                    t = t || window.location.pathname;
                    const e = /^(\/[^/]+\/[^/]+\/pull\/[^/]+)/,
                        n = t.match(e);
                    return n ? n[0] : null
                }
                i(vr, "getCurrentPullRequestPathname");
                var El = u(5628);
                async function Ll() {
                    return (0, V.AC)(".js-notification-shelf .js-notification-action form", async function(t, e) {
                        if (t.hasAttribute("data-redirect-to-inbox-on-submit")) {
                            await wr(e);
                            const o = document.querySelector(".js-notifications-back-to-inbox");
                            o && o.click();
                            return
                        }(0, El.a)(t, t), await wr(e)
                    })
                }
                i(Ll, "remoteShelfActionForm");

                function Sl() {
                    const t = new URLSearchParams(window.location.search),
                        e = bl(t);
                    if (e) {
                        const n = new URL(window.location.href, window.location.origin);
                        return n.search = e.toString(), n.toString()
                    }
                }
                i(Sl, "urlWithoutNotificationParameters");

                function jl(t) {
                    if (!(t instanceof Ho.Z)) return;
                    const e = yl();
                    if (!e) return;
                    const n = t.getAttribute("data-base-src");
                    if (!n) return;
                    const o = new URL(n, window.location.origin),
                        s = new URLSearchParams(o.search);
                    for (const [r, a] of Object.entries(e)) typeof a == "string" && s.set(r, a);
                    o.search = s.toString(), t.setAttribute("src", o.toString())
                }
                i(jl, "loadShelfFromStoredParams");
                async function wr(t) {
                    try {
                        await t.text()
                    } catch {}
                }
                i(wr, "performRequest"), Ll();

                function Tl() {
                    const t = Sl();
                    t && (0, Qt.lO)(null, "", t)
                }
                i(Tl, "removeNotificationParams"), Tl(), (0, y.N7)(".js-notification-shelf-include-fragment", jl), (0, d.on)("submit", ".js-mark-notification-form", async function(t) {
                    const e = t.currentTarget;
                    t.preventDefault();
                    try {
                        await fetch(e.action, {
                            method: e.method,
                            body: new FormData(e),
                            headers: {
                                Accept: "application/json",
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        })
                    } catch {}
                });
                async function Al() {
                    await kt.C;
                    const t = document.querySelector(".js-mark-notification-form");
                    t instanceof HTMLFormElement && (0, J.Bt)(t)
                }
                i(Al, "markNotificationAsRead"), Al();

                function Cl(t) {
                    return !!t.closest(".js-jump-to-field")
                }
                i(Cl, "isJumpToAvailable");

                function Eo(t, e) {
                    if (Cl(t)) return;
                    const n = document.querySelector(".js-site-search-form");
                    document.querySelector(".js-site-search").classList.toggle("scoped-search", e);
                    let o, s;
                    e ? (o = n.getAttribute("data-scoped-search-url"), s = t.getAttribute("data-scoped-placeholder")) : (o = n.getAttribute("data-unscoped-search-url"), s = t.getAttribute("data-unscoped-placeholder")), n.setAttribute("action", o), t.setAttribute("placeholder", s)
                }
                i(Eo, "toggleSearchScope"), (0, X.w4)("keyup", ".js-site-search-field", function(t) {
                    const e = t.target,
                        n = e.value.length === 0;
                    n && t.key === "Backspace" && e.classList.contains("is-clearable") && Eo(e, !1), n && t.key === "Escape" && Eo(e, !0), e.classList.toggle("is-clearable", n)
                }), (0, X.ZG)(".js-site-search-focus", function(t) {
                    const e = t.closest(".js-chromeless-input-container");
                    e.classList.add("focus");

                    function n() {
                        e.classList.remove("focus"), t.value.length === 0 && t.classList.contains("js-site-search-field") && Eo(t, !0), t.removeEventListener("blur", n)
                    }
                    i(n, "blurHandler"), t.addEventListener("blur", n)
                }), (0, d.on)("submit", ".js-site-search-form", function(t) {
                    if (!(t.target instanceof Element)) return;
                    const e = t.target.querySelector(".js-site-search-type-field");
                    e.value = new URLSearchParams(window.location.search).get("type") || ""
                });
                var kl = u(14707);
                (0, y.N7)("textarea.js-size-to-fit", {
                    constructor: HTMLTextAreaElement,
                    subscribe: kl.Z
                });
                var jf = u(21127);
                const xl = 1e3,
                    Er = new WeakMap,
                    Lr = document.querySelector("#snippet-clipboard-copy-button");
                async function Ml(t, e) {
                    const n = t.getAttribute("data-snippet-clipboard-copy-content");
                    if (n === null || (t.removeAttribute("data-snippet-clipboard-copy-content"), !(Lr instanceof HTMLTemplateElement))) return;
                    const s = Lr.content.cloneNode(!0).children[0];
                    if (!(s instanceof HTMLElement)) return;
                    const r = s.children[0];
                    if (!(r instanceof HTMLElement)) return;
                    r.setAttribute("value", n), document.addEventListener("selectionchange", () => {
                        const c = document.getSelection();
                        if (c && t.contains(c.anchorNode)) {
                            const l = c == null ? void 0 : c.toString();
                            r.style.display = l.trim() === "" ? "inherit" : "none"
                        }
                    }, {
                        signal: e
                    });
                    const a = t.querySelector("pre");
                    if (a !== null) {
                        let c;
                        a.addEventListener("scroll", () => {
                            c && clearTimeout(c), r.style.display = "none", c = setTimeout(() => {
                                r.style.display = "inherit"
                            }, xl)
                        }, {
                            signal: e
                        })
                    }
                    t.appendChild(s)
                }
                i(Ml, "insertSnippetClipboardCopyButton"), (0, y.N7)("[data-snippet-clipboard-copy-content]", {
                    constructor: HTMLElement,
                    add(t) {
                        const e = new AbortController;
                        Er.set(t, e), Ml(t, e.signal)
                    }
                }), (0, y.N7)(".snippet-clipboard-content clipboard-copy", {
                    constructor: HTMLElement,
                    remove(t) {
                        const e = Er.get(t);
                        e && e.abort()
                    }
                });

                function Sr(t, e, n) {
                    jr(t, e), n && t.classList.toggle("on");
                    const o = Array.from(t.querySelectorAll(".js-social-updatable"), xt.x0);
                    return Promise.all(o)
                }
                i(Sr, "handleSocialResponse"), (0, V.AC)(".js-social-form", async function(t, e) {
                    var n, o;
                    let s;
                    const r = t.closest(".js-social-container"),
                        a = t.classList.contains("js-deferred-toggler-target");
                    try {
                        s = await e.json(), r && await Sr(r, s.json.count, a)
                    } catch (c) {
                        if (((n = c.response) == null ? void 0 : n.status) === 409 && c.response.json.confirmationDialog) {
                            const l = c.response.json.confirmationDialog,
                                f = document.querySelector(l.templateSelector),
                                p = (o = t.querySelector(".js-confirm-csrf-token")) == null ? void 0 : o.value;
                            if (f instanceof HTMLTemplateElement && p) {
                                const E = new Et.R(f, {
                                        confirmUrl: t.action,
                                        confirmCsrfToken: p,
                                        ...l.inputs || {}
                                    }),
                                    L = await (0, Pt.W)({
                                        content: E
                                    });
                                L.addEventListener("social-confirmation-form:success", async T => {
                                    T instanceof CustomEvent && r && await Sr(r, T.detail.count, a)
                                }), L.addEventListener("social-confirmation-form:error", () => {
                                    (0, me.v)()
                                })
                            }
                        } else r && !a && r.classList.toggle("on"), (0, me.v)()
                    }
                }), (0, V.AC)(".js-social-confirmation-form", async function(t, e) {
                    try {
                        const n = await e.json();
                        (0, d.f)(t, "social-confirmation-form:success", n.json)
                    } catch {
                        (0, d.f)(t, "social-confirmation-form:error")
                    }
                });

                function jr(t, e) {
                    for (const n of t.querySelectorAll(".js-social-count")) {
                        n.textContent = e;
                        const o = n.getAttribute("data-singular-suffix"),
                            s = n.getAttribute("data-plural-suffix"),
                            r = e === "1" ? o : s;
                        r && n.setAttribute("aria-label", `${e} ${r}`)
                    }
                }
                i(jr, "updateSocialCounts");
                var Wt = u(33429);
                class Tr extends Wt.a2 {
                    constructor(e, n, o, s) {
                        super(e, () => this.getUrlFromRefreshUrl(), o, s);
                        this.refreshUrl = n
                    }
                    getUrlFromRefreshUrl() {
                        return ql(this.refreshUrl)
                    }
                }
                i(Tr, "AliveSession");
                async function ql(t) {
                    const e = await Pl(t);
                    return e && e.url && e.token ? Il(e.url, e.token) : null
                }
                i(ql, "fetchRefreshUrl");
                async function Pl(t) {
                    const e = await fetch(t, {
                        headers: {
                            Accept: "application/json"
                        }
                    });
                    if (e.ok) return e.json();
                    if (e.status === 404) return null;
                    throw new Error("fetch error")
                }
                i(Pl, "fetchJSON");
                async function Il(t, e) {
                    const n = await fetch(t, {
                        method: "POST",
                        mode: "same-origin",
                        headers: {
                            "Scoped-CSRF-Token": e
                        }
                    });
                    if (n.ok) return n.text();
                    throw new Error("fetch error")
                }
                i(Il, "post");
                const cn = [],
                    Rl = 3e4,
                    Dl = 0;
                let ln = document.hidden,
                    un;

                function Nl(t) {
                    return t(ln), cn.push(t), new P.w0(() => {
                        const e = cn.indexOf(t);
                        e !== -1 && cn.splice(e, 1)
                    })
                }
                i(Nl, "addIdleStateListener"), document.addEventListener("visibilitychange", () => {
                    const t = document.hidden;
                    un !== void 0 && clearTimeout(un), un = setTimeout(() => {
                        if (t !== ln) {
                            ln = t, un = void 0;
                            for (const n of cn) n(ln)
                        }
                    }, t ? Rl : Dl)
                });
                var Hl = u(39800);

                function Bl() {
                    return "SharedWorker" in window && (0, Hl.Z)("localStorage").getItem("bypassSharedWorker") !== "true"
                }
                i(Bl, "isSharedWorkerSupported");

                function _l() {
                    var t, e;
                    return (e = (t = document.head.querySelector("link[rel=shared-web-socket-src]")) == null ? void 0 : t.href) != null ? e : null
                }
                i(_l, "workerSrc");

                function Ol() {
                    var t, e;
                    return (e = (t = document.head.querySelector("link[rel=shared-web-socket]")) == null ? void 0 : t.href) != null ? e : null
                }
                i(Ol, "socketUrl");

                function $l() {
                    var t, e;
                    return (e = (t = document.head.querySelector("link[rel=shared-web-socket]")) == null ? void 0 : t.getAttribute("data-refresh-url")) != null ? e : null
                }
                i($l, "socketRefreshUrl");

                function Fl() {
                    var t, e;
                    return (e = (t = document.head.querySelector("link[rel=shared-web-socket]")) == null ? void 0 : t.getAttribute("data-session-id")) != null ? e : null
                }
                i(Fl, "sessionIdentifier");

                function Ul(t) {
                    return Ar(t).map(e => ({
                        subscriber: t,
                        topic: e
                    }))
                }
                i(Ul, "subscriptions");

                function Ar(t) {
                    return (t.getAttribute("data-channel") || "").trim().split(/\s+/).map(Wt.Zf.parse).filter(Wl)
                }
                i(Ar, "channels");

                function Wl(t) {
                    return t != null
                }
                i(Wl, "isPresent");

                function Cr(t, {
                    channel: e,
                    type: n,
                    data: o
                }) {
                    for (const s of t) s.dispatchEvent(new CustomEvent(`socket:${n}`, {
                        bubbles: !1,
                        cancelable: !1,
                        detail: {
                            name: e,
                            data: o
                        }
                    }))
                }
                i(Cr, "notify");
                class kr {
                    constructor(e, n, o, s, r) {
                        this.subscriptions = new Wt.vk, this.presenceMetadata = new Wt.ah, this.notifyPresenceDebouncedByChannel = new Map, this.notify = r, this.worker = new SharedWorker(e, `github-socket-worker-v2-${s}`), this.worker.port.onmessage = ({
                            data: a
                        }) => this.receive(a), this.worker.port.postMessage({
                            connect: {
                                url: n,
                                refreshUrl: o
                            }
                        })
                    }
                    subscribe(e) {
                        const n = this.subscriptions.add(...e);
                        n.length && this.worker.port.postMessage({
                            subscribe: n
                        });
                        const o = new Set(n.map(r => r.name)),
                            s = e.reduce((r, a) => {
                                const c = a.topic.name;
                                return (0, Wt.A)(c) && !o.has(c) && r.add(c), r
                            }, new Set);
                        s.size && this.worker.port.postMessage({
                            requestPresence: Array.from(s)
                        })
                    }
                    unsubscribeAll(...e) {
                        const n = this.subscriptions.drain(...e);
                        n.length && this.worker.port.postMessage({
                            unsubscribe: n
                        });
                        const o = this.presenceMetadata.removeSubscribers(e);
                        this.sendPresenceMetadataUpdate(o)
                    }
                    updatePresenceMetadata(e) {
                        const n = new Set;
                        for (const o of e) this.presenceMetadata.setMetadata(o), n.add(o.channelName);
                        this.sendPresenceMetadataUpdate(n)
                    }
                    sendPresenceMetadataUpdate(e) {
                        if (!e.size) return;
                        const n = [];
                        for (const o of e) n.push({
                            channelName: o,
                            metadata: this.presenceMetadata.getChannelMetadata(o)
                        });
                        this.worker.port.postMessage({
                            updatePresenceMetadata: n
                        })
                    }
                    online() {
                        this.worker.port.postMessage({
                            online: !0
                        })
                    }
                    offline() {
                        this.worker.port.postMessage({
                            online: !1
                        })
                    }
                    hangup() {
                        this.worker.port.postMessage({
                            hangup: !0
                        })
                    }
                    receive(e) {
                        const {
                            channel: n
                        } = e;
                        if (e.type === "presence") {
                            let o = this.notifyPresenceDebouncedByChannel.get(n);
                            o || (o = (0, te.D)((s, r) => {
                                this.notify(s, r), this.notifyPresenceDebouncedByChannel.delete(n)
                            }, 100), this.notifyPresenceDebouncedByChannel.set(n, o)), o(this.subscriptions.subscribers(n), e);
                            return
                        }
                        this.notify(this.subscriptions.subscribers(n), e)
                    }
                }
                i(kr, "AliveSessionProxy");

                function zl() {
                    const t = _l();
                    if (!t) return;
                    const e = Ol();
                    if (!e) return;
                    const n = $l();
                    if (!n) return;
                    const o = Fl();
                    if (!o) return;
                    const r = i(() => {
                            if (Bl()) try {
                                return new kr(t, e, n, o, Cr)
                            } catch {}
                            return new Tr(e, n, !1, Cr)
                        }, "createSession")(),
                        a = (0, Ct.g)(f => r.subscribe(f.flat())),
                        c = (0, Ct.g)(f => r.unsubscribeAll(...f)),
                        l = (0, Ct.g)(f => r.updatePresenceMetadata(f));
                    (0, y.N7)(".js-socket-channel[data-channel]", {
                        subscribe: f => {
                            const p = Ul(f),
                                E = p.map(T => T.topic.name).filter(T => (0, Wt.A)(T));
                            let L = {
                                unsubscribe() {}
                            };
                            if (E.length) {
                                let T, B;
                                const _ = i(() => {
                                    const Z = [];
                                    T && Z.push(T), B !== void 0 && Z.push({
                                        [Wt.ZE]: B ? 1 : 0
                                    });
                                    for (const Q of E) l({
                                        subscriber: f,
                                        channelName: Q,
                                        metadata: Z
                                    })
                                }, "queueMetadataOrIdleChange");
                                L = (0, P.qC)((0, P.RB)(f, "socket:set-presence-metadata", Z => {
                                    const {
                                        detail: Q
                                    } = Z;
                                    T = Q, _()
                                }), Nl(Z => {
                                    !(0, Dt.c)("PRESENCE_IDLE") || (B = Z, _())
                                }))
                            }
                            return a(p), L
                        },
                        remove: f => c(f)
                    }), window.addEventListener("online", () => r.online()), window.addEventListener("offline", () => r.offline()), window.addEventListener("unload", () => {
                        "hangup" in r && r.hangup()
                    })
                }
                i(zl, "connect"), (async () => (await kt.x, zl()))();
                const xr = new Map;

                function Kl(t, e) {
                    const n = [];
                    for (const o of t) {
                        const s = xr.get(o.name);
                        s && s.arrived > e && n.push(s)
                    }
                    return n
                }
                i(Kl, "stale");

                function Vl(t, e) {
                    for (const n of t.querySelectorAll(".js-socket-channel[data-channel]"))
                        for (const o of Kl(Ar(n), e)) n.dispatchEvent(new CustomEvent("socket:message", {
                            bubbles: !1,
                            cancelable: !1,
                            detail: {
                                name: o.name,
                                data: o.data,
                                cached: !0
                            }
                        }))
                }
                i(Vl, "dispatch");

                function Xl(t) {
                    const {
                        name: e,
                        data: n,
                        cached: o
                    } = t.detail;
                    if (o) return;
                    const s = {
                        name: e,
                        data: {
                            ...n
                        },
                        arrived: Date.now()
                    };
                    s.data.wait = 0, xr.set(e, s)
                }
                i(Xl, "store"), document.addEventListener("socket:message", Xl, {
                    capture: !0
                }), document.addEventListener("pjax:popstate", function(t) {
                    const e = t.target,
                        n = t.detail.cachedAt;
                    n && setTimeout(() => Vl(e, n))
                }), (0, y.N7)("form.js-auto-replay-enforced-sso-request", {
                    constructor: HTMLFormElement,
                    initialize(t) {
                        (0, J.Bt)(t)
                    }
                });
                var Tf = u(85695);

                function Mr(t, e, n) {
                    const o = t.getBoundingClientRect().height,
                        s = e.getBoundingClientRect(),
                        r = n.getBoundingClientRect();
                    let a = r.top;
                    a + s.height + 10 >= o && (a = Math.max(o - s.height - 10, 0));
                    let c = r.right;
                    n.closest(".js-build-status-to-the-left") != null && (c = Math.max(r.left - s.width - 10, 0)), e.style.top = `${a}px`, e.style.left = `${c}px`, e.style.right = "auto"
                }
                i(Mr, "updateStatusPosition"), (0, d.on)("toggle", ".js-build-status .js-dropdown-details", function(t) {
                    const e = t.currentTarget,
                        n = e.querySelector(".js-status-dropdown-menu");
                    if (!n) return;

                    function o() {
                        e.hasAttribute("open") || r()
                    }
                    i(o, "closeOnToggle");

                    function s(a) {
                        n.contains(a.target) || r()
                    }
                    i(s, "closeOnScroll");

                    function r() {
                        e.removeAttribute("open"), n.classList.add("d-none"), e.appendChild(n), e.removeEventListener("toggle", o), window.removeEventListener("scroll", s)
                    }
                    i(r, "closeStatusPopover"), e.addEventListener("toggle", o), n.classList.contains("js-close-menu-on-scroll") && window.addEventListener("scroll", s, {
                        capture: !0
                    }), n.classList.remove("d-none"), n.querySelector(".js-details-container").classList.add("open"), n.classList.contains("js-append-menu-to-body") && (document.body.appendChild(n), Mr(document.body, n, e))
                }, {
                    capture: !0
                });
                async function qr(t) {
                    const e = t.querySelector(".js-dropdown-details"),
                        n = t.querySelector(".js-status-dropdown-menu") || t.closest(".js-status-dropdown-menu");
                    if (!(n instanceof HTMLElement)) return;
                    const o = n.querySelector(".js-status-loader");
                    if (!o) return;
                    const s = n.querySelector(".js-status-loading"),
                        r = n.querySelector(".js-status-error"),
                        a = o.getAttribute("data-contents-url");
                    s.classList.remove("d-none"), r.classList.add("d-none");
                    let c;
                    try {
                        await (0, hr.Z)(), c = await (0, ct.a)(document, a)
                    } catch {
                        s.classList.add("d-none"), r.classList.remove("d-none")
                    }
                    c && (o.replaceWith(c), n.querySelector(".js-details-container").classList.add("open"), e && n.classList.contains("js-append-menu-to-body") && Mr(document.body, n, e))
                }
                i(qr, "loadStatus"), (0, d.on)("click", ".js-status-retry", ({
                    currentTarget: t
                }) => {
                    qr(t)
                });

                function Pr(t) {
                    const e = t.currentTarget;
                    qr(e)
                }
                i(Pr, "onMouseEnter"), (0, y.N7)(".js-build-status", {
                    add(t) {
                        t.addEventListener("mouseenter", Pr, {
                            once: !0
                        })
                    },
                    remove(t) {
                        t.removeEventListener("mouseenter", Pr)
                    }
                });
                var Af = u(1868),
                    Gl = u(8758);
                (0, d.on)("click", "button[data-sudo-required], summary[data-sudo-required]", Ir), (0, y.N7)("form[data-sudo-required]", {
                    constructor: HTMLFormElement,
                    subscribe: t => (0, P.RB)(t, "submit", Ir)
                });
                async function Ir(t) {
                    const e = t.currentTarget;
                    if (!(e instanceof HTMLElement)) return;
                    t.stopPropagation(), t.preventDefault(), await (0, Gl.Z)() && (e.removeAttribute("data-sudo-required"), e instanceof HTMLFormElement ? (0, J.Bt)(e) : e.click())
                }
                i(Ir, "checkSudo");
                var Ht = u(63370),
                    we = u(29818);
                const Rr = {
                    "actor:": "ul.js-user-suggestions",
                    "user:": "ul.js-user-suggestions",
                    "operation:": "ul.js-operation-suggestions",
                    "org:": "ul.js-org-suggestions",
                    "action:": "ul.js-action-suggestions",
                    "repo:": "ul.js-repo-suggestions",
                    "country:": "ul.js-country-suggestions"
                };
                (0, y.N7)("text-expander[data-audit-url]", {
                    subscribe: t => (0, P.qC)((0, P.RB)(t, "text-expander-change", Jl), (0, P.RB)(t, "text-expander-value", Zl))
                });

                function Zl(t) {
                    const e = t.detail;
                    if (!Dr(e.key)) return;
                    const n = e.item.getAttribute("data-value");
                    e.value = `${e.key}${n}`
                }
                i(Zl, "onvalue");

                function Jl(t) {
                    const {
                        key: e,
                        provide: n,
                        text: o
                    } = t.detail;
                    if (!Dr(e)) return;
                    const r = t.target.getAttribute("data-audit-url");
                    n(tu(r, e, o))
                }
                i(Jl, "onchange");

                function Yl(t, e) {
                    const n = e.toLowerCase(),
                        o = i(s => {
                            const r = s.textContent.toLowerCase().trim(),
                                a = (0, Ht.EW)(r, n);
                            return a > 0 ? {
                                score: a,
                                text: r
                            } : null
                        }, "key");
                    return n ? (0, we.W)(t, o, Ht.qu) : t
                }
                i(Yl, "search");
                const Ql = (0, St.Z)(t => [...t.children], {
                    hash: t => t.className
                });
                async function tu(t, e, n) {
                    const s = (await ou(t)).querySelector(eu(e));
                    if (!s) return {
                        matched: !1
                    };
                    const r = Yl(Ql(s), n).slice(0, 5),
                        a = s.cloneNode(!1);
                    a.innerHTML = "";
                    for (const c of r) a.append(c);
                    return {
                        fragment: a,
                        matched: r.length > 0
                    }
                }
                i(tu, "auditMenu");

                function Dr(t) {
                    return Object.getOwnPropertyNames(Rr).includes(t)
                }
                i(Dr, "isActivationKey");

                function eu(t) {
                    const e = Rr[t];
                    if (!e) throw new Error(`Unknown audit log expander key: ${t}`);
                    return e
                }
                i(eu, "audit_log_suggester_selector");
                async function nu(t) {
                    const e = await (0, ct.a)(document, t),
                        n = document.createElement("div");
                    return n.append(e), n
                }
                i(nu, "fetchMenu");
                const ou = (0, St.Z)(nu);

                function su(t) {
                    if (t.hasAttribute("data-use-colon-emoji")) return t.getAttribute("data-value");
                    const e = t.firstElementChild;
                    return e && e.tagName === "G-EMOJI" && !e.firstElementChild ? e.textContent : t.getAttribute("data-value")
                }
                i(su, "getValue");

                function ru(t, e) {
                    const n = ` ${e.toLowerCase().replace(/_/g," ")}`,
                        o = i(s => {
                            const r = s.getAttribute("data-emoji-name"),
                                a = au(iu(s), n);
                            return a > 0 ? {
                                score: a,
                                text: r
                            } : null
                        }, "key");
                    return (0, we.W)(t, o, Ht.qu)
                }
                i(ru, "emoji_suggester_search");

                function iu(t) {
                    return ` ${t.getAttribute("data-text").trim().toLowerCase().replace(/_/g," ")}`
                }
                i(iu, "emojiText");

                function au(t, e) {
                    const n = t.indexOf(e);
                    return n > -1 ? 1e3 - n : 0
                }
                i(au, "emojiScore"), (0, y.N7)("text-expander[data-emoji-url]", {
                    subscribe: t => (0, P.qC)((0, P.RB)(t, "text-expander-change", lu), (0, P.RB)(t, "text-expander-value", cu))
                });

                function cu(t) {
                    const e = t.detail;
                    e.key === ":" && (e.value = su(e.item))
                }
                i(cu, "emoji_suggester_onvalue");

                function lu(t) {
                    const {
                        key: e,
                        provide: n,
                        text: o
                    } = t.detail;
                    if (e !== ":") return;
                    const r = t.target.getAttribute("data-emoji-url");
                    n(uu(r, o))
                }
                i(lu, "emoji_suggester_onchange");
                async function uu(t, e) {
                    const [n, o] = await fu(t), s = ru(o, e).slice(0, 5);
                    n.innerHTML = "";
                    for (const r of s) n.append(r);
                    return {
                        fragment: n,
                        matched: s.length > 0
                    }
                }
                i(uu, "emojiMenu");
                async function du(t) {
                    const n = (await (0, ct.a)(document, t)).firstElementChild;
                    return [n, [...n.children]]
                }
                i(du, "fetchEmoji");
                const fu = (0, St.Z)(du);
                var zt = u(5723);

                function mu(t) {
                    return `${t.number} ${t.title.trim().toLowerCase()}`
                }
                i(mu, "asText");

                function hu(t, e) {
                    if (!e) return t;
                    const n = new RegExp(`\\b${pu(e)}`),
                        o = /^\d+$/.test(e) ? r => gu(r, n) : r => (0, Ht.EW)(r, e),
                        s = i(r => {
                            const a = mu(r),
                                c = o(a);
                            return c > 0 ? {
                                score: c,
                                text: a
                            } : null
                        }, "key");
                    return (0, we.W)(t, s, Ht.qu)
                }
                i(hu, "issue_suggester_search");

                function pu(t) {
                    return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                }
                i(pu, "escapeRegExp");

                function gu(t, e) {
                    const n = t.search(e);
                    return n > -1 ? 1e3 - n : 0
                }
                i(gu, "issueNumberScore");

                function bu(t, e, n) {
                    const o = i(r => zt.dy`
    <ul role="listbox" class="suggester-container suggester suggestions list-style-none position-absolute">
      ${r.map(s)}
    </ul>
  `, "itemsTemplate"),
                        s = i(r => {
                            const a = r.type in n ? (0, wt.r)(document, n[r.type]) : "";
                            return zt.dy`
      <li class="markdown-title" role="option" id="suggester-issue-${r.id}" data-value="${r.number}">
        <span class="d-inline-block mr-1">${a}</span>
        <small>#${r.number}</small> ${(0,zt.Au)(r.title)}
      </li>
    `
                        }, "itemTemplate");
                    (0, zt.sY)(o(t), e)
                }
                i(bu, "renderResults"), (0, y.N7)("text-expander[data-issue-url]", {
                    subscribe: t => {
                        const e = [(0, P.RB)(t, "text-expander-change", vu), (0, P.RB)(t, "text-expander-value", yu), (0, P.RB)(t, "keydown", Eu), (0, P.RB)(t, "click", wu)];
                        return (0, P.qC)(...e)
                    }
                });

                function yu(t) {
                    const e = t.detail;
                    if (e.key !== "#") return;
                    const n = e.item.getAttribute("data-value");
                    e.value = `#${n}`
                }
                i(yu, "issue_suggester_onvalue");

                function vu(t) {
                    const {
                        key: e,
                        provide: n,
                        text: o
                    } = t.detail;
                    if (e !== "#") return;
                    if (o === "#") {
                        Lo(t.target);
                        return
                    }
                    const r = t.target.getAttribute("data-issue-url");
                    n(Lu(r, o))
                }
                i(vu, "issue_suggester_onchange");

                function Lo(t) {
                    if (!t) return;
                    const e = t.closest("text-expander");
                    e && e.dismiss()
                }
                i(Lo, "hideSuggestions");

                function wu(t) {
                    Lo(t.target)
                }
                i(wu, "issue_suggester_onclick");

                function Eu(t) {
                    const e = ["ArrowRight", "ArrowLeft"],
                        {
                            key: n
                        } = t;
                    e.indexOf(n) < 0 || Lo(t.target)
                }
                i(Eu, "issue_suggester_onkeydown");
                async function Lu(t, e) {
                    const n = await Su(t),
                        o = document.createElement("div"),
                        s = hu(n.suggestions, e).slice(0, 5);
                    return bu(s, o, n.icons), {
                        fragment: o.firstElementChild,
                        matched: s.length > 0
                    }
                }
                i(Lu, "issueMenu");
                const Su = (0, St.Z)(async function(t) {
                    const e = await self.fetch(t, {
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                            Accept: "application/json"
                        }
                    });
                    if (!e.ok) {
                        const n = new Error,
                            o = e.statusText ? ` ${e.statusText}` : "";
                        throw n.message = `HTTP ${e.status}${o}`, n
                    }
                    return e.json()
                });

                function ju(t) {
                    return t.description ? `${t.name} ${t.description}`.trim().toLowerCase() : `${t.login} ${t.name}`.trim().toLowerCase()
                }
                i(ju, "mention_suggester_asText");

                function Tu(t, e) {
                    if (!e) return t;
                    const n = Cu(e),
                        o = i(s => {
                            const r = ju(s),
                                a = n(r, s.participant);
                            return a > 0 ? {
                                score: a,
                                text: r
                            } : null
                        }, "key");
                    return (0, we.W)(t, o, Ht.qu)
                }
                i(Tu, "mention_suggester_search");

                function Au(t, e) {
                    const n = i(s => zt.dy`
    <ul role="listbox" class="suggester-container suggester suggestions list-style-none position-absolute">
      ${s.map(o)}
    </ul>
  `, "itemsTemplate"),
                        o = i(s => {
                            const r = s.type === "user" ? s.login : s.name,
                                a = s.type === "user" ? s.name : s.description;
                            return zt.dy`
      <li role="option" id="suggester-${s.id}-${s.type}-${r}" data-value="${r}">
        <span>${r}</span>
        <small>${a}</small>
      </li>
    `
                        }, "itemTemplate");
                    (0, zt.sY)(n(t), e)
                }
                i(Au, "mention_suggester_renderResults");

                function Cu(t) {
                    if (!t) return () => 2;
                    const e = t.toLowerCase().split("");
                    return (n, o) => {
                        if (!n) return 0;
                        const s = ku(n, e);
                        if (!s) return 0;
                        const a = t.length / s[1] / (s[0] / 2 + 1);
                        return o ? a + 1 : a
                    }
                }
                i(Cu, "fuzzyScorer");

                function ku(t, e) {
                    let n, o, s, r;
                    const a = xu(t, e[0]);
                    if (a.length === 0) return null;
                    if (e.length === 1) return [a[0], 1, []];
                    for (r = null, o = 0, s = a.length; o < s; o++) {
                        const c = a[o];
                        if (!(n = Mu(t, e, c + 1))) continue;
                        const l = n[n.length - 1] - c;
                        (!r || l < r[1]) && (r = [c, l, n])
                    }
                    return r
                }
                i(ku, "shortestMatch");

                function xu(t, e) {
                    let n = 0;
                    const o = [];
                    for (;
                        (n = t.indexOf(e, n)) > -1;) o.push(n++);
                    return o
                }
                i(xu, "allIndexesOf");

                function Mu(t, e, n) {
                    let o = n;
                    const s = [];
                    for (let r = 1; r < e.length; r += 1) {
                        if (o = t.indexOf(e[r], o), o === -1) return;
                        s.push(o++)
                    }
                    return s
                }
                i(Mu, "indexesOfChars"), (0, y.N7)("text-expander[data-mention-url]", {
                    subscribe: t => (0, P.qC)((0, P.RB)(t, "text-expander-change", Pu), (0, P.RB)(t, "text-expander-value", qu))
                });

                function qu(t) {
                    const e = t.detail;
                    if (e.key !== "@") return;
                    const n = e.item.getAttribute("data-value");
                    e.value = `@${n}`
                }
                i(qu, "mention_suggester_onvalue");

                function Pu(t) {
                    const {
                        key: e,
                        provide: n,
                        text: o
                    } = t.detail;
                    if (e !== "@" || (o == null ? void 0 : o.split(" ").length) > 1) return;
                    const r = t.target.getAttribute("data-mention-url");
                    n(Iu(r, o))
                }
                i(Pu, "mention_suggester_onchange");
                async function Iu(t, e) {
                    const n = await Ru(t),
                        o = document.createElement("div"),
                        s = Tu(n, e).slice(0, 5);
                    return Au(s, o), {
                        fragment: o.firstElementChild,
                        matched: s.length > 0
                    }
                }
                i(Iu, "mentionMenu");
                const Ru = (0, St.Z)(async function(t) {
                        const e = await self.fetch(t, {
                            headers: {
                                "X-Requested-With": "XMLHttpRequest",
                                Accept: "application/json"
                            }
                        });
                        if (!e.ok) {
                            const n = new Error,
                                o = e.statusText ? ` ${e.statusText}` : "";
                            throw n.message = `HTTP ${e.status}${o}`, n
                        }
                        return e.json()
                    }),
                    So = "/";

                function Du(t, e) {
                    const n = e.toLowerCase().trim(),
                        o = i(s => {
                            const r = (s.getAttribute("data-text") || "").trim().toLowerCase(),
                                a = (0, Ht.EW)(r, n);
                            return a > 0 ? {
                                score: a,
                                text: r
                            } : null
                        }, "key");
                    return n ? (0, we.W)(t, o, Ht.qu) : t
                }
                i(Du, "slash_command_suggester_search"), (0, y.N7)("slash-command-expander[data-slash-command-url]", {
                    subscribe: t => (0, P.qC)((0, P.RB)(t, "text-expander-change", Wu), (0, P.RB)(t, "text-expander-value", Nu))
                }), (0, d.on)("click", ".js-slash-command-toolbar-button", async t => {
                    if (!(t.target instanceof Element)) return;
                    const e = t.target.closest(".js-previewable-comment-form");
                    if (!e) return;
                    const n = e.querySelector("textarea.js-comment-field");
                    if (!n) return;
                    const o = So,
                        s = n.selectionEnd || 0,
                        r = n.value.substring(0, s),
                        a = n.value.substring(s),
                        c = n.value === "" || r.match(/\s$/) ? "" : " ",
                        l = s + o.length + 1;
                    n.value = r + c + o + a, n.selectionStart = l, n.selectionEnd = l, n.focus(), (0, d.f)(n, "input")
                });
                async function Nu(t) {
                    const e = t.detail,
                        {
                            key: n,
                            item: o
                        } = e;
                    if (n !== So) return;
                    const s = o.getAttribute("data-url");
                    if (!s) return;
                    const r = t.currentTarget,
                        a = o.querySelector(".js-slash-command-suggestion-form");
                    if (!a) return;
                    const c = a.querySelector(".js-data-url-csrf");
                    if (!c) return;
                    const l = new FormData(a);
                    r.isLoading();
                    try {
                        const f = await (0, ct.a)(document, s, {
                            method: "PATCH",
                            body: l,
                            headers: {
                                Accept: "text/html",
                                "Scoped-CSRF-Token": c.value
                            }
                        });
                        if (!f) return;
                        Nr(r, f)
                    } catch {
                        r.showError()
                    }
                }
                i(Nu, "onValue");

                function Nr(t, e) {
                    var n;
                    const o = e.firstElementChild;
                    if (!o) return;
                    e.children.length > 1 && Uu(e.lastElementChild, t), o.hasAttribute("data-reload-suggestions") && (_r = (0, St.Z)(Br));
                    const s = o.getAttribute("data-component-type");
                    s === "fill" ? /<\/?[a-z][\s\S]*>/i.test(o.innerHTML) ? t.setValue(o.innerHTML.trim()) : t.setValue(((n = o.textContent) == null ? void 0 : n.trim()) || "") : s === "menu" || s === "error" ? t.setMenu(o.querySelector(".js-slash-command-menu")) : s === "action" ? t.closeMenu() : s === "embedded_form" ? $u(t, o) : s === "dialog_form" ? _u(t, o) : s === "modal_form" && Ou(t, o), (0, jt.e6)(Nt())
                }
                i(Nr, "handleResponse");

                function Hu(t) {
                    if (!(t.metaKey && t.key === "Enter")) return;
                    t.preventDefault(), t.stopPropagation();
                    const e = t.target,
                        n = e == null ? void 0 : e.form;
                    if (!!n)
                        if (n.requestSubmit) n.requestSubmit();
                        else {
                            const o = n.querySelector("[type='submit']");
                            o == null || o.click()
                        }
                }
                i(Hu, "submitOnCommandEnter");

                function Hr(t) {
                    const e = new FormData(t);
                    let n = "";
                    for (const o of e) n = n + o[0], n = n + o[1].toString();
                    return n
                }
                i(Hr, "getFormContents");

                function jo(t) {
                    let e = !1;
                    for (const n of t.querySelectorAll("select,input,textarea")) {
                        const o = n;
                        o.type !== "hidden" && (e || (o.focus(), e = !0), o.addEventListener("keydown", Hu))
                    }
                }
                i(jo, "focusFirstFormInput");

                function To(t, e) {
                    const n = t.querySelectorAll("[data-close-dialog]");
                    for (const o of n) o.addEventListener("click", s => {
                        s.preventDefault(), (0, jt.Xm)(Nt(), {
                            selector: ".js-session-resumable"
                        }), e()
                    })
                }
                i(To, "hookUpCancelActionListeners");

                function Ao(t, e, n, o) {
                    const s = Hr(t);
                    e.addEventListener("keydown", r => {
                        if (r.key === "Escape") {
                            const a = "Are you sure you want to dismiss the form?",
                                c = Hr(t);
                            (s === c || confirm(a)) && ((0, jt.Xm)(Nt(), {
                                selector: ".js-session-resumable"
                            }), o(), n && n.focus())
                        }
                    })
                }
                i(Ao, "addDismissAlertListener");

                function Co(t, e, n) {
                    t.addEventListener("submit", async o => {
                        o.preventDefault();
                        const s = o.target,
                            r = s.querySelector(".js-data-url-csrf");
                        if (!r) return;
                        const a = s.getAttribute("action");
                        if (!a) return;
                        Bu(e);
                        const c = new FormData(s),
                            l = await (0, ct.a)(document, a, {
                                method: "PATCH",
                                body: c,
                                headers: {
                                    Accept: "text/html",
                                    "Scoped-CSRF-Token": r.value
                                }
                            });
                        n(), !!l && Nr(e, l)
                    })
                }
                i(Co, "addSubmitButtonListener");

                function Bu(t) {
                    const e = t.closest(".js-slash-command-surface"),
                        n = t.closest("form"),
                        o = e || n;
                    if (o)
                        for (const s of o.querySelectorAll("[data-disable-with][disabled]")) s.disabled = !1
                }
                i(Bu, "reenableParentFormButtons");

                function _u(t, e) {
                    const n = e.querySelector(".js-slash-command-menu");
                    t.setMenu(n, !0);
                    const o = n.querySelector("form"),
                        s = document.activeElement;
                    jo(o);
                    const r = i(() => {
                        t.closeMenu()
                    }, "closeForm");
                    Ao(o, o, s, r), To(o, r), Co(o, t, r)
                }
                i(_u, "handleDialogForm");

                function Ou(t, e) {
                    const n = t.closest("form");
                    if (!n) return;
                    const o = e.querySelector('[data-component="form"]');
                    n.insertAdjacentElement("afterend", o);
                    const s = document.activeElement;
                    jo(o);
                    const r = i(() => {
                        n.hidden = !1, o.remove()
                    }, "closeForm");
                    To(o, r);
                    const a = o.getElementsByTagName("form")[0];
                    Ao(a, o, s, r), Co(o, t, r)
                }
                i(Ou, "handleModalForm");

                function $u(t, e) {
                    const n = t.closest(".js-slash-command-surface"),
                        o = t.closest("form"),
                        s = n || o;
                    if (!s) return;
                    s.hidden = !0;
                    const r = e.querySelector('[data-component="form"]');
                    s.insertAdjacentElement("afterend", r);
                    const a = document.activeElement;
                    jo(r);
                    const c = i(() => {
                        s.hidden = !1, r.remove()
                    }, "closeForm");
                    To(r, c);
                    const l = r.getElementsByTagName("form")[0];
                    Ao(l, r, a, c), Co(r, t, c)
                }
                i($u, "handleEmbeddedForm");
                const Fu = 5e3;

                function Uu(t, e) {
                    var n, o;
                    const s = (n = e.parentElement) == null ? void 0 : n.parentElement;
                    if (!s) return;
                    const r = s.querySelector(".drag-and-drop .default");
                    let a = !1;
                    r && (a = r.hidden, r.hidden = !0), (o = r == null ? void 0 : r.parentElement) == null || o.prepend(t), setTimeout(() => {
                        r && (r.hidden = a), t.remove()
                    }, Fu)
                }
                i(Uu, "showFooter");

                function Wu(t) {
                    const {
                        key: e,
                        provide: n,
                        text: o
                    } = t.detail;
                    if (e !== So) return;
                    const s = t.target;
                    s.isLoading();
                    const r = s.getAttribute("data-slash-command-url");
                    n(zu(r, o, s))
                }
                i(Wu, "onChange");
                async function zu(t, e, n) {
                    try {
                        const [o, s] = await _r(t), r = o.querySelector(".js-slash-command-menu-items"), a = Du(s, e);
                        if (r) {
                            r.innerHTML = "";
                            for (const c of s)
                                if (c.classList.contains("js-group-divider")) {
                                    const l = c.getAttribute("data-group-id");
                                    a.filter(p => p.getAttribute("data-group-id") === l).length > 0 && r.append(c)
                                } else a.includes(c) && r.append(c)
                        }
                        return {
                            fragment: o,
                            matched: a.length > 0
                        }
                    } catch (o) {
                        throw n.showError(), new Error(o)
                    }
                }
                i(zu, "slashCommandMenu");
                async function Br(t) {
                    const n = (await (0, ct.a)(document, t)).firstElementChild,
                        o = n.querySelectorAll(".js-slash-command-menu-items li");
                    return [n, [...o]]
                }
                i(Br, "fetchSlashCommands");
                let _r = (0, St.Z)(Br);

                function Ku(t, e) {
                    const n = t.closest(".js-survey-question-form"),
                        o = n.querySelector("input.js-survey-other-text"),
                        s = e && !n.classList.contains("is-other-selected");
                    n.classList.toggle("is-other-selected", s), o.hidden = !e, s ? (o.required = !0, o.focus()) : o.required = !1, (0, d.f)(o, "change")
                }
                i(Ku, "handleOther"), (0, d.on)("change", "input.js-survey-radio", function({
                    currentTarget: t
                }) {
                    Ku(t, t.classList.contains("js-survey-radio-other"))
                }), (0, d.on)("change", "input.js-survey-checkbox-enable-submit", function({
                    currentTarget: t
                }) {
                    var e;
                    const n = t.checked,
                        o = (e = t.closest("form")) == null ? void 0 : e.querySelector("button[type=submit]");
                    o.disabled = !n
                }), (0, d.on)("change", "input.js-survey-contact-checkbox", function(t) {
                    const e = t.currentTarget,
                        o = e.closest(".js-survey-question-form").querySelector(".js-survey-contact-checkbox-hidden");
                    e.checked ? o.setAttribute("disabled", "true") : o.removeAttribute("disabled")
                }), (0, d.on)("details-menu-selected", ".js-sync-select-menu-text", function(t) {
                    const e = document.querySelector(".js-sync-select-menu-button"),
                        n = t.detail.relatedTarget.querySelector("span[data-menu-button-text]").textContent;
                    e.textContent = n, e.focus()
                }, {
                    capture: !0
                }), (0, d.on)("click", 'tab-container [role="tab"]', function(t) {
                    const {
                        currentTarget: e
                    } = t, o = e.closest("tab-container").querySelector(".js-filterable-field, [data-filter-placeholder-input]");
                    if (o instanceof HTMLInputElement) {
                        const s = e.getAttribute("data-filter-placeholder");
                        s && o.setAttribute("placeholder", s), o.focus()
                    }
                }), (0, d.on)("tab-container-changed", "tab-container", function(t) {
                    const e = t.detail.relatedTarget,
                        n = e.getAttribute("data-fragment-url"),
                        o = e.querySelector("include-fragment");
                    n && o && !o.hasAttribute("src") && (o.src = n)
                });
                var Cf = u(811),
                    Or = u(84028);
                document.addEventListener("keydown", t => {
                    if (t.key !== "Escape" || t.target !== document.body) return;
                    const e = document.querySelector(".js-targetable-element:target");
                    !e || (0, Or.uQ)(e, () => {
                        window.location.hash = "", window.history.replaceState(null, "", window.location.pathname + window.location.search)
                    })
                }), document.addEventListener("click", t => {
                    const e = document.querySelector(".js-targetable-element:target");
                    !e || t.target instanceof HTMLAnchorElement || t.target instanceof HTMLElement && (e.contains(t.target) || (0, Or.uQ)(e, () => {
                        window.location.hash = "", window.history.replaceState(null, "", window.location.pathname + window.location.search)
                    }))
                });
                var kf = u(21668);
                async function Vu(t) {
                    const e = t.currentTarget;
                    if (Gu(e)) {
                        e.classList.remove("tooltipped");
                        return
                    }
                    const n = e.getAttribute("data-url");
                    if (!n) return;
                    const o = await fetch(n, {
                        headers: {
                            Accept: "application/json"
                        }
                    });
                    if (!o.ok) return;
                    const s = await o.json(),
                        r = e.getAttribute("data-id"),
                        a = document.querySelectorAll(`.js-team-mention[data-id='${r}']`);
                    for (const c of a) c.removeAttribute("data-url");
                    try {
                        s.total === 0 ? s.members.push("This team has no members") : s.total > s.members.length && s.members.push(`${s.total-s.members.length} more`), $r(a, Xu(s.members))
                    } catch (c) {
                        const l = c.response ? c.response.status : 500,
                            f = e.getAttribute(l === 404 ? "data-permission-text" : "data-error-text");
                        $r(a, f)
                    }
                }
                i(Vu, "members");

                function $r(t, e) {
                    for (const n of t) n instanceof HTMLElement && (n.setAttribute("aria-label", e), n.classList.add("tooltipped", "tooltipped-s", "tooltipped-multiline"))
                }
                i($r, "tip");

                function Xu(t) {
                    if ("ListFormat" in Intl) return new Intl.ListFormat().format(t);
                    if (t.length === 0) return "";
                    if (t.length === 1) return t[0];
                    if (t.length === 2) return t.join(" and "); {
                        const e = t[t.length - 1];
                        return t.slice(0, -1).concat(`and ${e}`).join(", ")
                    }
                }
                i(Xu, "sentence");

                function Gu(t) {
                    return !!t.getAttribute("data-hovercard-url") && !!t.closest("[data-team-hovercards-enabled]")
                }
                i(Gu, "teamHovercardEnabled"), (0, y.N7)(".js-team-mention", function(t) {
                    t.addEventListener("mouseenter", Vu)
                });
                var Zu = Object.defineProperty,
                    Ju = Object.getOwnPropertyDescriptor,
                    dn = i((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? Ju(e, n) : e, r = t.length - 1, a; r >= 0; r--)(a = t[r]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && Zu(e, n, s), s
                    }, "text_suggester_element_decorateClass");
                let Ee = i(class extends HTMLElement {
                    acceptSuggestion() {
                        var t;
                        ((t = this.suggestion) == null ? void 0 : t.textContent) && (this.input.value = this.suggestion.textContent, this.input.dispatchEvent(new Event("input")), this.suggestionContainer && (this.suggestionContainer.hidden = !0), this.input.focus())
                    }
                }, "TextSuggesterElement");
                dn([q.fA], Ee.prototype, "input", 2), dn([q.fA], Ee.prototype, "suggestionContainer", 2), dn([q.fA], Ee.prototype, "suggestion", 2), Ee = dn([q.Ih], Ee);

                function Yu() {
                    const t = document.querySelector(".js-timeline-marker");
                    return t != null ? t.getAttribute("data-last-modified") : null
                }
                i(Yu, "getTimelineLastModified");

                function Fr(t) {
                    if (td(t) || Qu(t)) return;
                    const e = Yu();
                    e && t.headers.set("X-Timeline-Last-Modified", e)
                }
                i(Fr, "addTimelineLastModifiedHeader");

                function Qu(t) {
                    return t.headers.get("X-PJAX") === "true"
                }
                i(Qu, "isPjax");

                function td(t) {
                    let e;
                    try {
                        e = new URL(t.url)
                    } catch {
                        return !0
                    }
                    return e.host !== window.location.host
                }
                i(td, "isCrossDomain"), (0, V.AC)(".js-needs-timeline-marker-header", function(t, e, n) {
                    Fr(n)
                }), (0, d.on)("deprecatedAjaxSend", "[data-remote]", function(t) {
                    const {
                        request: e
                    } = t.detail;
                    Fr(e)
                });
                const Ur = 5e3,
                    ed = ".js-comment-body img",
                    nd = ".js-comment-body video";
                (0, Ue.Z)(function({
                    target: t
                }) {
                    const e = mn();
                    if (e && !t) {
                        const n = document.querySelector("#js-timeline-progressive-loader");
                        n && Wr(e, n)
                    }
                }), (0, y.N7)(".js-timeline-progressive-focus-container", function(t) {
                    var e;
                    const n = mn();
                    if (!n) return;
                    const o = document.getElementById(n);
                    if (o && t.contains(o)) fn(o);
                    else {
                        const s = t.querySelectorAll(".js-comment-container");
                        for (const r of s) {
                            const a = r.getAttribute("data-thread-comments-ids");
                            if (a) {
                                const c = a.split(","),
                                    l = (e = n.match(/\d+/g)) == null ? void 0 : e[0];
                                if (l && c.includes(l)) {
                                    xs(r);
                                    break
                                }
                            }
                        }
                    }
                }), (0, y.N7)(".js-inline-comments-container", function(t) {
                    const e = mn();
                    if (!e) return;
                    const n = document.getElementById(e);
                    n && t.contains(n) && fn(n)
                }), (0, y.N7)("#js-discussions-timeline-anchor-loader", {
                    constructor: HTMLElement,
                    add: t => {
                        if (document.querySelector("#js-timeline-progressive-loader")) return;
                        const n = mn();
                        if (!n) return;
                        document.getElementById(n) || Wr(n, t)
                    }
                });
                async function od() {
                    const t = document.querySelectorAll(nd),
                        e = Array.from(t).map(n => new Promise(o => {
                            if (n.readyState >= n.HAVE_METADATA) o(n);
                            else {
                                const s = setTimeout(() => o(n), Ur),
                                    r = i(() => {
                                        clearTimeout(s), o(n)
                                    }, "done");
                                n.addEventListener("loadeddata", () => {
                                    n.readyState >= n.HAVE_METADATA && r()
                                }), n.addEventListener("error", () => r())
                            }
                        }));
                    return Promise.all(e)
                }
                i(od, "videosReady");
                async function sd() {
                    const t = document.querySelectorAll(ed),
                        e = Array.from(t).map(n => {
                            new Promise(o => {
                                if (n.complete) o(n);
                                else {
                                    const s = setTimeout(() => o(n), Ur),
                                        r = i(() => {
                                            clearTimeout(s), o(n)
                                        }, "done");
                                    n.addEventListener("load", () => r()), n.addEventListener("error", () => r())
                                }
                            })
                        });
                    return Promise.all(e)
                }
                i(sd, "imagesReady");
                async function rd() {
                    return Promise.all([od(), sd()])
                }
                i(rd, "mediaLoaded");
                async function fn(t) {
                    await rd(), id(t);
                    const e = t.querySelector(`[href='#${t.id}']`);
                    if (e) {
                        const n = e.getAttribute("data-turbo");
                        e.setAttribute("data-turbo", "false"), e.click(), n === null ? e.removeAttribute("data-turbo") : e.setAttribute("data-turbo", n)
                    }
                }
                i(fn, "focusElement");
                async function Wr(t, e) {
                    if (!e) return;
                    const n = e.getAttribute("data-timeline-item-src");
                    if (!n) return;
                    const o = new URL(n, window.location.origin),
                        s = new URLSearchParams(o.search.slice(1));
                    s.append("anchor", t), o.search = s.toString();
                    let r;
                    try {
                        r = await (0, ct.a)(document, o.toString())
                    } catch {
                        return
                    }
                    const a = r.querySelector(".js-timeline-item");
                    if (!a) return;
                    const c = a.getAttribute("data-gid");
                    if (!c) return;
                    const l = document.querySelector(`.js-timeline-item[data-gid='${c}']`);
                    if (l) {
                        l.replaceWith(a);
                        const f = document.getElementById(t);
                        f && await fn(f)
                    } else {
                        const f = document.getElementById("js-progressive-timeline-item-container");
                        f && f.replaceWith(r);
                        const p = document.getElementById(t);
                        p && await fn(p)
                    }
                }
                i(Wr, "loadElement");

                function id(t) {
                    const e = t.closest("details, .js-details-container");
                    !e || (e.nodeName === "DETAILS" ? e.setAttribute("open", "open") : (0, Vn.jo)(e) || (0, Vn.Qp)(e))
                }
                i(id, "expandDetailsIfPresent");

                function mn() {
                    return window.location.hash.slice(1)
                }
                i(mn, "urlAnchor"), (0, y.N7)(".js-discussion", ad);

                function ad() {
                    let t = new WeakSet;
                    e(), document.addEventListener("pjax:end", e), (0, y.N7)(".js-timeline-item", n => {
                        n instanceof HTMLElement && (t.has(n) || (0, at.N)(n))
                    });

                    function e() {
                        t = new WeakSet(document.querySelectorAll(".js-timeline-item"))
                    }
                    i(e, "setExistingTimelineItems")
                }
                i(ad, "announceTimelineEvents");
                var Le = u(92547);

                function Se(t) {
                    const {
                        name: e,
                        value: n
                    } = t, o = {
                        name: window.location.href
                    };
                    switch (e) {
                        case "CLS":
                            o.cls = n;
                            break;
                        case "FCP":
                            o.fcp = n;
                            break;
                        case "FID":
                            o.fid = n;
                            break;
                        case "LCP":
                            o.lcp = n;
                            break;
                        case "TTFB":
                            o.ttfb = n;
                            break
                    }(0, Lt.b)({
                        webVitalTimings: [o]
                    }), cd(e, n)
                }
                i(Se, "sendVitals");

                function cd(t, e) {
                    const n = document.querySelector("#staff-bar-web-vitals"),
                        o = n == null ? void 0 : n.querySelector(`[data-metric=${t.toLowerCase()}]`);
                    !o || (o.textContent = e.toPrecision(6))
                }
                i(cd, "updateStaffBar");

                function ld() {
                    return !!(window.performance && window.performance.timing && window.performance.getEntriesByType)
                }
                i(ld, "isTimingSuppported");
                async function ud() {
                    if (!ld()) return;
                    await kt.C, await new Promise(n => setTimeout(n));
                    const t = window.performance.getEntriesByType("resource");
                    t.length && (0, Lt.b)({
                        resourceTimings: t
                    });
                    const e = window.performance.getEntriesByType("navigation");
                    e.length && (0, Lt.b)({
                        navigationTimings: e
                    })
                }
                i(ud, "sendTimingResults"), ud(), (0, Le.kz)(Se), (0, Le.Y)(Se), (0, Le.Tx)(Se), (0, Le.Tb)(Se), (0, Le.CA)(Se), (0, d.on)("click", ".js-toggler-container .js-toggler-target", function(t) {
                    if (t.button !== 0) return;
                    const e = t.currentTarget.closest(".js-toggler-container");
                    e && e.classList.toggle("on")
                }), (0, V.AC)(".js-toggler-container", async (t, e) => {
                    t.classList.remove("success", "error"), t.classList.add("loading");
                    try {
                        await e.text(), t.classList.add("success")
                    } catch {
                        t.classList.add("error")
                    } finally {
                        t.classList.remove("loading")
                    }
                });
                var zr = u(27852),
                    Kr = i((t, e, n) => {
                        if (!e.has(t)) throw TypeError("Cannot " + n)
                    }, "primer_tooltip_element_accessCheck"),
                    Bt = i((t, e, n) => (Kr(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "primer_tooltip_element_privateGet"),
                    je = i((t, e, n) => {
                        if (e.has(t)) throw TypeError("Cannot add the same private member more than once");
                        e instanceof WeakSet ? e.add(t) : e.set(t, n)
                    }, "primer_tooltip_element_privateAdd"),
                    tt = i((t, e, n, o) => (Kr(t, e, "write to private field"), o ? o.call(t, n) : e.set(t, n), n), "primer_tooltip_element_privateSet"),
                    Te, hn, ut, dt, pn;
                const Vr = "hx_tooltip-open",
                    Xr = "hx_tooltip",
                    Gr = 10,
                    Zr = ["hx_tooltip-n", "hx_tooltip-s", "hx_tooltip-e", "hx_tooltip-w", "hx_tooltip-ne", "hx_tooltip-se", "hx_tooltip-nw", "hx_tooltip-sw"],
                    dd = {
                        n: "hx_tooltip-n",
                        s: "hx_tooltip-s",
                        e: "hx_tooltip-e",
                        w: "hx_tooltip-w",
                        ne: "hx_tooltip-ne",
                        se: "hx_tooltip-se",
                        nw: "hx_tooltip-nw",
                        sw: "hx_tooltip-sw"
                    };
                class gn extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        je(this, Te, void 0), je(this, hn, "s"), je(this, ut, "center"), je(this, dt, "outside-bottom"), je(this, pn, !1)
                    }
                    get htmlFor() {
                        return this.getAttribute("for") || ""
                    }
                    set htmlFor(e) {
                        this.setAttribute("for", e)
                    }
                    get control() {
                        return this.ownerDocument.getElementById(this.htmlFor)
                    }
                    get type() {
                        return this.getAttribute("data-type") === "label" ? "label" : "description"
                    }
                    set type(e) {
                        this.setAttribute("data-type", e)
                    }
                    get direction() {
                        return Bt(this, hn)
                    }
                    set direction(e) {
                        this.setAttribute("data-direction", e)
                    }
                    get align() {
                        return Bt(this, ut)
                    }
                    get side() {
                        return Bt(this, dt)
                    }
                    connectedCallback() {
                        this.hidden = !0, tt(this, pn, !0), this.id || (this.id = `tooltip-${Date.now()}-${(Math.random()*1e4).toFixed(0)}`), !!this.control && (this.classList.add(Xr), this.setAttribute("role", "tooltip"), this.addEvents())
                    }
                    attributeChangedCallback(e, n, o) {
                        if (e === "id" || e === "data-type") {
                            if (!this.id || !this.control) return;
                            if (this.type === "label") this.control.setAttribute("aria-labelledby", this.id);
                            else {
                                let s = this.control.getAttribute("aria-describedby");
                                s ? s = `${s} ${this.id}` : s = this.id, this.control.setAttribute("aria-describedby", s)
                            }
                        } else if (e === "hidden")
                            if (this.hidden) this.classList.remove(Vr, ...Zr);
                            else {
                                this.classList.add(Vr, Xr);
                                for (const s of this.ownerDocument.querySelectorAll(this.tagName)) s !== this && (s.hidden = !0);
                                this.updatePosition()
                            }
                        else if (e === "data-direction") {
                            this.classList.remove(...Zr);
                            const s = tt(this, hn, o || "s");
                            s === "n" ? (tt(this, ut, "center"), tt(this, dt, "outside-top")) : s === "ne" ? (tt(this, ut, "start"), tt(this, dt, "outside-top")) : s === "e" ? (tt(this, ut, "center"), tt(this, dt, "outside-right")) : s === "se" ? (tt(this, ut, "start"), tt(this, dt, "outside-bottom")) : s === "s" ? (tt(this, ut, "center"), tt(this, dt, "outside-bottom")) : s === "sw" ? (tt(this, ut, "end"), tt(this, dt, "outside-bottom")) : s === "w" ? (tt(this, ut, "center"), tt(this, dt, "outside-left")) : s === "nw" && (tt(this, ut, "end"), tt(this, dt, "outside-top"))
                        }
                    }
                    disconnectedCallback() {
                        Bt(this, Te).abort()
                    }
                    addEvents() {
                        if (!this.control) return;
                        tt(this, Te, new AbortController);
                        const {
                            signal: e
                        } = Bt(this, Te);
                        this.addEventListener("mouseleave", this, {
                            signal: e
                        }), this.control.addEventListener("mouseenter", this, {
                            signal: e
                        }), this.control.addEventListener("mouseleave", this, {
                            signal: e
                        }), this.control.addEventListener("focus", this, {
                            signal: e
                        }), this.control.addEventListener("blur", this, {
                            signal: e
                        }), this.ownerDocument.addEventListener("keydown", this, {
                            signal: e
                        })
                    }
                    handleEvent(e) {
                        !this.control || ((e.type === "mouseenter" || e.type === "focus") && this.hidden ? this.hidden = !1 : e.type === "blur" ? this.hidden = !0 : e.type === "mouseleave" && e.relatedTarget !== this.control && e.relatedTarget !== this ? this.hidden = !0 : e.type === "keydown" && e.key === "Escape" && !this.hidden && (this.hidden = !0))
                    }
                    adjustedAnchorAlignment(e) {
                        if (!this.control) return;
                        const n = this.getBoundingClientRect(),
                            o = this.control.getBoundingClientRect(),
                            s = n.width,
                            r = n.left + s / 2,
                            a = o.x + o.width / 2;
                        return Math.abs(r - a) < 2 || e === "outside-left" || e === "outside-right" ? "center" : n.left === o.left ? "start" : n.right === o.right ? "end" : r < a ? n.left === 0 ? "start" : "end" : n.right === 0 ? "end" : "start"
                    }
                    updatePosition() {
                        if (!this.control || !Bt(this, pn) || this.hidden) return;
                        this.style.left = "0px";
                        let e = (0, zr.N)(this, this.control, {
                                side: Bt(this, dt),
                                align: Bt(this, ut),
                                anchorOffset: Gr
                            }),
                            n = e.anchorSide;
                        this.style.top = `${e.top}px`, this.style.left = `${e.left}px`;
                        let o = "s";
                        const s = this.adjustedAnchorAlignment(n);
                        !s || (this.style.left = "0px", e = (0, zr.N)(this, this.control, {
                            side: n,
                            align: s,
                            anchorOffset: Gr
                        }), n = e.anchorSide, this.style.top = `${e.top}px`, this.style.left = `${e.left}px`, n === "outside-left" ? o = "w" : n === "outside-right" ? o = "e" : n === "outside-top" ? s === "center" ? o = "n" : s === "start" ? o = "ne" : o = "nw" : s === "center" ? o = "s" : s === "start" ? o = "se" : o = "sw", this.classList.add(dd[o]))
                    }
                }
                i(gn, "PrimerTooltipElement"), Te = new WeakMap, hn = new WeakMap, ut = new WeakMap, dt = new WeakMap, pn = new WeakMap, gn.observedAttributes = ["data-type", "data-direction", "id", "hidden"], window.customElements.get("primer-tooltip") || (window.PrimerTooltipElement = gn, window.customElements.define("primer-tooltip", gn)), (0, Dt.c)("TURBO") && (u.e(3692).then(u.bind(u, 23692)), document.addEventListener("turbo:click", function(t) {
                    if (!(t.target instanceof HTMLElement)) return;
                    const e = t.target.closest("[data-turbo-frame]");
                    e instanceof HTMLElement && t.target.setAttribute("data-turbo-frame", e.getAttribute("data-turbo-frame") || "")
                }));

                function fd() {
                    if ("Intl" in window) try {
                        return new window.Intl.DateTimeFormat().resolvedOptions().timeZone
                    } catch {}
                }
                i(fd, "timezone"), window.requestIdleCallback(() => {
                    const t = fd();
                    t && (0, pe.d8)("tz", encodeURIComponent(t))
                });
                var Jr = u(94745),
                    md = Object.defineProperty,
                    hd = Object.getOwnPropertyDescriptor,
                    rt = i((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? hd(e, n) : e, r = t.length - 1, a; r >= 0; r--)(a = t[r]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && md(e, n, s), s
                    }, "webauthn_get_decorateClass"),
                    pd = (t => (t.Initializing = "initializing", t.Unsupported = "unsupported", t.Ready = "ready", t.Waiting = "waiting", t.Error = "error", t.Submitting = "submitting", t))(pd || {});
                let gt = i(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.state = "initializing", this.json = "", this.autofocusWhenReady = !1, this.autoPrompt = !1, this.hasErrored = !1
                    }
                    connectedCallback() {
                        this.originalButtonText = this.button.textContent, this.setState((0, Jr.Zh)() ? "ready" : "unsupported"), this.autoPrompt && this.prompt(void 0, !0)
                    }
                    setState(t) {
                        this.button.textContent = this.hasErrored ? this.button.getAttribute("data-retry-message") : this.originalButtonText, this.button.disabled = !1, this.button.hidden = !1;
                        for (const e of this.messages) e.hidden = !0;
                        switch (t) {
                            case "initializing":
                                this.button.disabled = !0;
                                break;
                            case "unsupported":
                                this.button.disabled = !0, this.unsupportedMessage.hidden = !1;
                                break;
                            case "ready":
                                this.autofocusWhenReady && this.button.focus();
                                break;
                            case "waiting":
                                this.waitingMessage.hidden = !1, this.button.hidden = !0;
                                break;
                            case "error":
                                this.errorMessage.hidden = !1;
                                break;
                            case "submitting":
                                this.button.textContent = "Verifying\u2026", this.button.disabled = !0;
                                break;
                            default:
                                throw new Error("invalid state")
                        }
                        this.state = t
                    }
                    async prompt(t, e) {
                        t == null || t.preventDefault(), this.dispatchEvent(new CustomEvent("webauthn-get-prompt"));
                        try {
                            e || this.setState("waiting");
                            const n = JSON.parse(this.json),
                                o = await (0, Jr.U2)(n);
                            this.setState("submitting");
                            const s = this.closest(".js-webauthn-form"),
                                r = s.querySelector(".js-webauthn-response");
                            r.value = JSON.stringify(o), (0, J.Bt)(s)
                        } catch (n) {
                            if (!e) throw this.hasErrored = !0, this.setState("error"), n
                        }
                    }
                }, "WebauthnGetElement");
                rt([q.fA], gt.prototype, "button", 2), rt([q.GO], gt.prototype, "messages", 2), rt([q.fA], gt.prototype, "unsupportedMessage", 2), rt([q.fA], gt.prototype, "waitingMessage", 2), rt([q.fA], gt.prototype, "errorMessage", 2), rt([q.Lj], gt.prototype, "json", 2), rt([q.Lj], gt.prototype, "autofocusWhenReady", 2), rt([q.Lj], gt.prototype, "autoPrompt", 2), gt = rt([q.Ih], gt);
                var gd = (t => (t.Initializing = "initializing", t.ShowingForm = "showing-form", t.ShowingRevealer = "showing-revealer", t))(gd || {});
                let ie = i(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.state = "showing-form"
                    }
                    connectedCallback() {
                        this.setState(this.state)
                    }
                    setState(t) {
                        switch (this.revealer.hidden = !0, this.form.hidden = !1, t) {
                            case "initializing":
                                break;
                            case "showing-form":
                                this.passwordField.focus(), this.dispatchEvent(new CustomEvent("sudo-password-showing-form"));
                                break;
                            case "showing-revealer":
                                this.revealer.hidden = !1, this.form.hidden = !0;
                                break;
                            default:
                                throw new Error("invalid state")
                        }
                        this.state = t
                    }
                    reveal() {
                        this.setState("showing-form")
                    }
                }, "SudoPasswordElement");
                rt([q.Lj], ie.prototype, "state", 2), rt([q.fA], ie.prototype, "revealer", 2), rt([q.fA], ie.prototype, "form", 2), rt([q.fA], ie.prototype, "passwordField", 2), ie = rt([q.Ih], ie);
                let bn = i(class extends HTMLElement {
                    connectedCallback() {
                        var t;
                        (t = this.webauthnGet) == null || t.addEventListener("webauthn-get-prompt", () => {
                            this.sudoPassword.setState("showing-revealer")
                        }), this.sudoPassword.addEventListener("sudo-password-showing-form", () => {
                            var e;
                            (e = this.webauthnGet) == null || e.setState("ready")
                        })
                    }
                }, "SudoAuthElement");
                rt([q.fA], bn.prototype, "webauthnGet", 2), rt([q.fA], bn.prototype, "sudoPassword", 2), bn = rt([q.Ih], bn);
                let ko = 0;

                function bd() {
                    if (!document.hasFocus()) return;
                    const t = document.querySelector(".js-timeline-marker-form");
                    t && t instanceof HTMLFormElement && (0, J.Bt)(t)
                }
                i(bd, "markThreadAsRead");
                const yn = "IntersectionObserver" in window ? new IntersectionObserver(function(t) {
                    for (const e of t) e.isIntersecting && Yr(e.target)
                }, {
                    root: null,
                    rootMargin: "0px",
                    threshold: 1
                }) : null;
                (0, y.N7)(".js-unread-item", {
                    constructor: HTMLElement,
                    add(t) {
                        ko++, yn && yn.observe(t)
                    },
                    remove(t) {
                        ko--, yn && yn.unobserve(t), ko === 0 && bd()
                    }
                });

                function Yr(t) {
                    t.classList.remove("js-unread-item", "unread-item")
                }
                i(Yr, "clearUnread"), (0, y.N7)(".js-discussion[data-channel-target]", {
                    subscribe: t => (0, P.RB)(t, "socket:message", function(e) {
                        const n = e.target,
                            o = e.detail.data;
                        if (n.getAttribute("data-channel-target") === o.gid)
                            for (const s of document.querySelectorAll(".js-unread-item")) Yr(s)
                    })
                });
                let vn = 0;
                const Qr = /^\(\d+\)\s+/;

                function ti() {
                    const t = vn ? `(${vn}) ` : "";
                    document.title.match(Qr) ? document.title = document.title.replace(Qr, t) : document.title = `${t}${document.title}`
                }
                i(ti, "updateTitle"), (0, y.N7)(".js-unread-item", {
                    add() {
                        vn++, ti()
                    },
                    remove() {
                        vn--, ti()
                    }
                }), (0, y.N7)(".js-socket-channel.js-updatable-content", {
                    subscribe: t => (0, P.RB)(t, "socket:message", function(e) {
                        const {
                            gid: n,
                            wait: o
                        } = e.detail.data, s = e.target, r = n ? yd(s, n) : s;
                        r && setTimeout(xt.x0, o || 0, r)
                    })
                });

                function yd(t, e) {
                    if (t.getAttribute("data-gid") === e) return t;
                    for (const n of t.querySelectorAll("[data-url][data-gid]"))
                        if (n.getAttribute("data-gid") === e) return n;
                    return null
                }
                i(yd, "findByGid");
                async function vd() {
                    if (!(!history.state || !history.state.staleRecords)) {
                        await kt.x;
                        for (const t in history.state.staleRecords)
                            for (const e of document.querySelectorAll(`.js-updatable-content [data-url='${t}'], .js-updatable-content[data-url='${t}']`)) {
                                const n = history.state.staleRecords[t];
                                e instanceof HTMLElement && (0, xt.Of)(e, n, !0)
                            }(0, Qt.lO)(null, "", location.href)
                    }
                }
                i(vd, "reapplyPreviouslyUpdatedContent"), window.addEventListener("beforeunload", function() {
                    if (Object.keys(xt.WU).length > 0) {
                        const t = history.state || {};
                        t.staleRecords = xt.WU, (0, Qt.lO)(t, "", location.href)
                    }
                });
                try {
                    vd()
                } catch {}(0, d.on)("upload:setup", ".js-upload-avatar-image", function(t) {
                    const {
                        form: e
                    } = t.detail, n = t.currentTarget.getAttribute("data-alambic-organization"), o = t.currentTarget.getAttribute("data-alambic-owner-type"), s = t.currentTarget.getAttribute("data-alambic-owner-id");
                    n && e.append("organization_id", n), o && e.append("owner_type", o), s && e.append("owner_id", s)
                }), (0, d.on)("upload:complete", ".js-upload-avatar-image", function(t) {
                    const {
                        attachment: e
                    } = t.detail, n = `/settings/avatars/${e.id}`;
                    (0, Pt.W)({
                        content: (0, ct.a)(document, n)
                    })
                });
                var ei = u(67647);

                function wn() {
                    if (document.querySelector(":target")) return;
                    const t = (0, ei.$z)(location.hash).toLowerCase(),
                        e = (0, ei.Q)(document, `user-content-${t}`);
                    e && (0, Yn.zT)(e)
                }
                i(wn, "hashchange"), window.addEventListener("hashchange", wn), document.addEventListener("pjax:success", wn), async function() {
                    await kt.x, wn()
                }(), (0, d.on)("click", "a[href]", function(t) {
                    const {
                        currentTarget: e
                    } = t;
                    e instanceof HTMLAnchorElement && e.href === location.href && location.hash.length > 1 && setTimeout(function() {
                        t.defaultPrevented || wn()
                    })
                });
                async function wd(t) {
                    const e = t.currentTarget,
                        {
                            init: n
                        } = await u.e(8615).then(u.bind(u, 78615));
                    n(e)
                }
                i(wd, "user_status_loader_load"), (0, y.N7)(".js-user-status-container", {
                    subscribe: t => (0, P.RB)(t, "click", wd, {
                        once: !0
                    })
                });
                var En = u(36805);

                function Ed(t, e) {
                    const n = t.querySelector(".js-user-list-base");
                    n && (n.textContent = e || n.getAttribute("data-generic-message"), n.hidden = !1)
                }
                i(Ed, "setFlashError");

                function ni(t, e) {
                    const o = (e || t).querySelectorAll(".js-user-list-error");
                    for (const a of o) a.hidden = !0;
                    const s = e ? [e] : t.querySelectorAll(".errored.js-user-list-input-container");
                    for (const a of s) a.classList.remove("errored");
                    const r = t.querySelector(".js-user-list-base");
                    r && (r.hidden = !0)
                }
                i(ni, "resetValidation"), (0, V.AC)(".js-user-list-form", async function(t, e) {
                    var n;
                    ni(t);
                    const o = t.querySelector("[data-submitting-message]"),
                        s = o == null ? void 0 : o.textContent;
                    o && (o.textContent = o.getAttribute("data-submitting-message"), o.disabled = !0);
                    for (const r of t.querySelectorAll(".js-user-list-input")) r.disabled = !0;
                    try {
                        const r = await e.html();
                        (0, d.f)(t, "user-list-form:success", r.html)
                    } catch (r) {
                        if (((n = r.response) == null ? void 0 : n.status) === 422) t.replaceWith(r.response.html);
                        else {
                            Ed(t), o && (s && (o.textContent = s), o.disabled = !1);
                            for (const a of t.querySelectorAll(".js-user-list-input")) a.disabled = !1
                        }
                    }
                }), (0, d.on)("user-list-form:success", ".js-follow-list", t => {
                    const e = t.detail,
                        n = e instanceof DocumentFragment ? e.querySelector(".js-target-url") : null;
                    (n == null ? void 0 : n.textContent) ? location.href = n.textContent: location.reload()
                });

                function oi(t) {
                    if (!(t.currentTarget instanceof HTMLElement)) return;
                    const e = t.currentTarget.closest(".js-user-list-form"),
                        n = t.currentTarget.closest(".js-user-list-input-container");
                    e && n && ni(e, n)
                }
                i(oi, "clearErrorsFromInput"), (0, X.q6)(".js-user-list-form input", oi), (0, X.q6)(".js-user-list-form textarea", oi), (0, d.on)("auto-check-error", ".js-user-list-form input", function(t) {
                    const e = t.currentTarget.closest(".js-user-list-input-container"),
                        n = e == null ? void 0 : e.querySelector(".js-user-list-error");
                    n && (n.hidden = !1)
                });

                function Ld(t) {
                    var e;
                    const n = new Map;
                    for (const o of t) {
                        const s = (e = o.querySelector(".js-user-lists-create-trigger")) == null ? void 0 : e.getAttribute("data-repository-id");
                        if (s) {
                            const r = n.get(s);
                            r ? r.push(o) : n.set(s, [o])
                        }
                    }
                    return n
                }
                i(Ld, "groupRootsByRepositoryId");
                async function Sd(t, e, n) {
                    const o = new FormData;
                    o.set("authenticity_token", e);
                    for (const a of n) o.append("repository_ids[]", a);
                    const s = await fetch(t, {
                            method: "POST",
                            body: o,
                            headers: {
                                Accept: "application/json",
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        }),
                        r = new Map;
                    if (s.ok) {
                        const a = await s.json();
                        for (const c in a) r.set(c, (0, wt.r)(document, a[c]))
                    }
                    return r
                }
                i(Sd, "requestMenuBatchRender");

                function jd(t, e) {
                    for (const [n, o] of t.entries()) {
                        const s = e.get(n) || [];
                        for (const r of s) r.replaceWith(s.length === 1 ? o : o.cloneNode(!0))
                    }
                }
                i(jd, "replaceUserListMenuRoots");
                async function si() {
                    var t;
                    const e = document.querySelectorAll(".js-user-list-menu-content-root");
                    if (e.length === 0) return;
                    const n = e[0].getAttribute("data-batch-update-url");
                    if (!n) return;
                    const o = (t = e[0].querySelector(".js-user-list-batch-update-csrf")) == null ? void 0 : t.value;
                    if (!o) return;
                    const s = Ld(e),
                        r = s.keys(),
                        a = await Sd(n, o, r);
                    a.size > 0 && jd(a, s)
                }
                i(si, "updateAllUserListMenus");

                function Td(t) {
                    const e = new Promise((n, o) => {
                        t.addEventListener("user-list-menu-form:success", () => n()), t.addEventListener("user-list-menu-form:error", s => o(s))
                    });
                    return (0, J.Bt)(t), e
                }
                i(Td, "requestUserListMenuFormSubmit");

                function Ad(t) {
                    const e = t.target;
                    if (!(e instanceof HTMLDetailsElement) || e.hasAttribute("open")) return;
                    const n = e.querySelector(".js-user-list-menu-form");
                    n && (0, En.T)(n) && (0, J.Bt)(n)
                }
                i(Ad, "submitUserListFormOnToggle"), (0, d.on)("toggle", ".js-user-list-menu", Ad, {
                    capture: !0
                }), (0, V.AC)(".js-user-list-menu-form", async function(t, e) {
                    let n;
                    try {
                        n = await e.json()
                    } catch (s) {
                        (0, me.v)(), (0, d.f)(t, "user-list-menu-form:error", s);
                        return
                    }
                    if (n.json.didStar) {
                        const s = t.closest(".js-toggler-container");
                        s && s.classList.add("on");
                        const r = n.json.starCount;
                        if (r) {
                            const a = t.closest(".js-social-container");
                            a && jr(a, r)
                        }
                    }
                    const o = t.closest(".js-user-list-menu-content-root[data-update-after-submit]");
                    if (o)
                        for (const s of t.querySelectorAll(".js-user-list-menu-item")) s.checked = s.defaultChecked;
                    n.json.didCreate ? await si() : o && await (0, xt.x0)(o), (0, d.f)(t, "user-list-menu-form:success")
                }), (0, d.on)("click", ".js-user-list-delete-confirmation-trigger", t => {
                    const {
                        currentTarget: e
                    } = t, n = e.getAttribute("data-template-id");
                    if (!n) return;
                    const o = document.getElementById(n);
                    if (!o || !(o instanceof HTMLTemplateElement)) return;
                    const s = e.closest(".js-edit-user-list-dialog");
                    s && (s.open = !1);
                    const r = o.content.cloneNode(!0),
                        a = o.getAttribute("data-labelledby");
                    (0, Pt.W)({
                        content: r,
                        labelledBy: a
                    })
                }), (0, d.on)("click", ".js-user-lists-create-trigger", async function(t) {
                    const {
                        currentTarget: e
                    } = t, n = document.querySelector(".js-user-list-create-dialog-template"), o = t.currentTarget.getAttribute("data-repository-id"), s = e.closest(".js-user-list-menu-content-root");
                    if (!n || !(n instanceof HTMLTemplateElement) || !o) {
                        e instanceof HTMLButtonElement && (e.disabled = !0);
                        return
                    }
                    const r = n.getAttribute("data-label");
                    if (s && (0, En.T)(s)) {
                        const l = s.querySelector(".js-user-list-menu-form");
                        l && await Td(l)
                    }
                    const a = new Et.R(n, {
                            repositoryId: o
                        }),
                        c = await (0, Pt.W)({
                            content: a,
                            label: r
                        });
                    c.addEventListener("user-list-form:success", async () => {
                        await si();
                        const l = c.closest("details");
                        l && (l.open = !1)
                    })
                });
                var Cd = Object.defineProperty,
                    kd = Object.getOwnPropertyDescriptor,
                    Ln = i((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? kd(e, n) : e, r = t.length - 1, a; r >= 0; r--)(a = t[r]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && Cd(e, n, s), s
                    }, "visible_password_element_decorateClass");
                let Ae = i(class extends HTMLElement {
                    show() {
                        this.input.type = "text", this.input.focus(), this.showButton.hidden = !0, this.hideButton.hidden = !1
                    }
                    hide() {
                        this.input.type = "password", this.input.focus(), this.hideButton.hidden = !0, this.showButton.hidden = !1
                    }
                }, "VisiblePasswordElement");
                Ln([q.fA], Ae.prototype, "input", 2), Ln([q.fA], Ae.prototype, "showButton", 2), Ln([q.fA], Ae.prototype, "hideButton", 2), Ae = Ln([q.Ih], Ae), (0, y.N7)("[data-warn-unsaved-changes]", {
                    add(t) {
                        t.addEventListener("input", Sn), t.addEventListener("change", Sn), t.addEventListener("submit", Ce);
                        const e = t.closest("details-dialog");
                        e && (e.closest("details").addEventListener("toggle", ri), e.addEventListener("details-dialog-close", ii))
                    },
                    remove(t) {
                        t.removeEventListener("input", Sn), t.removeEventListener("change", Sn), t.removeEventListener("submit", Ce);
                        const e = t.closest("details-dialog");
                        e && (e.closest("details").removeEventListener("toggle", ri), e.removeEventListener("details-dialog-close", ii), Ce())
                    }
                });

                function Sn(t) {
                    const e = t.currentTarget;
                    (0, En.T)(e) ? xd(e): Ce()
                }
                i(Sn, "prepareUnsavedChangesWarning");

                function xd(t) {
                    const e = t.getAttribute("data-warn-unsaved-changes") || "Changes you made may not be saved.";
                    window.onbeforeunload = function(n) {
                        return n.returnValue = e, e
                    }
                }
                i(xd, "enableSaveChangesReminder");

                function Ce() {
                    window.onbeforeunload = null
                }
                i(Ce, "disableSaveChangesReminder");

                function ri({
                    currentTarget: t
                }) {
                    t.hasAttribute("open") || Ce()
                }
                i(ri, "disableSaveChangesReminderOnClosedDialogs");

                function ii(t) {
                    const e = t.currentTarget;
                    if (!e.closest("details[open]")) return;
                    let o = !0;
                    const s = e.querySelectorAll("form[data-warn-unsaved-changes]");
                    for (const r of s)
                        if ((0, En.T)(r)) {
                            const a = r.getAttribute("data-warn-unsaved-changes");
                            o = confirm(a);
                            break
                        } o || t.preventDefault()
                }
                i(ii, "promptOnDialogClosing"), (0, y.N7)(".will-transition-once", {
                    constructor: HTMLElement,
                    subscribe: t => (0, P.RB)(t, "transitionend", Md)
                });

                function Md(t) {
                    t.target.classList.remove("will-transition-once")
                }
                i(Md, "onTransitionEnd");

                function qd(t, e = 0) {
                    const n = t.getBoundingClientRect(),
                        o = n.top - e,
                        s = n.bottom - window.innerHeight + e;
                    o < 0 ? window.scrollBy(0, o) : s > 0 && window.scrollBy(0, s)
                }
                i(qd, "adjustViewport"), (0, d.on)("click", ".js-video-play, .js-video-close", function(t) {
                    const n = t.currentTarget.closest(".js-video-container"),
                        o = n.querySelector(".js-video-iframe");
                    n.tagName.toLowerCase() === "details" && n.addEventListener("details-dialog-close", function() {
                        o.removeAttribute("src"), window.setTimeout(function() {
                            n.classList.remove("is-expanded")
                        }, 10)
                    }), n.classList.contains("is-expanded") ? (o.removeAttribute("src"), n.classList.remove("is-expanded")) : (o.src = o.getAttribute("data-src") || "", n.classList.add("is-expanded")), qd(o, 20)
                });
                async function Pd(t) {
                    const e = t.currentTarget,
                        n = e.getAttribute("data-url");
                    if (!n || Id(e)) return;
                    const o = e.getAttribute("data-id") || "",
                        s = e.textContent,
                        r = document.querySelectorAll(`.js-issue-link[data-id='${o}']`);
                    for (const a of r) a.removeAttribute("data-url");
                    try {
                        const a = `${n}/title`,
                            c = await fetch(a, {
                                headers: {
                                    "X-Requested-With": "XMLHttpRequest",
                                    Accept: "application/json"
                                }
                            });
                        if (!c.ok) {
                            const f = new Error,
                                p = c.statusText ? ` ${c.statusText}` : "";
                            throw f.message = `HTTP ${c.status}${p}`, f
                        }
                        const l = await c.json();
                        ai(r, `${s}, ${l.title}`)
                    } catch (a) {
                        const c = (a.response != null ? a.response.status : void 0) || 500,
                            l = (() => {
                                switch (c) {
                                    case 404:
                                        return e.getAttribute("data-permission-text");
                                    default:
                                        return e.getAttribute("data-error-text")
                                }
                            })();
                        ai(r, l || "")
                    }
                }
                i(Pd, "issueLabel");

                function ai(t, e) {
                    for (const n of t) n instanceof HTMLElement && (n.classList.add("tooltipped", "tooltipped-ne"), n.setAttribute("aria-label", e))
                }
                i(ai, "setLabel");

                function Id(t) {
                    switch (t.getAttribute("data-hovercard-type")) {
                        case "issue":
                        case "pull_request":
                            return !!t.closest("[data-issue-and-pr-hovercards-enabled]");
                        case "discussion":
                            return !!t.closest("[data-discussion-hovercards-enabled]");
                        default:
                            return !1
                    }
                }
                i(Id, "isHovercardEnabled"), (0, y.N7)(".js-issue-link", {
                    subscribe: t => (0, P.RB)(t, "mouseenter", Pd)
                });
                var Rd = u(87635),
                    Kt = u.n(Rd);

                function xo() {
                    return [Math.floor(Math.random() * (255 - 0) + 0), Math.floor(Math.random() * (255 - 0) + 0), Math.floor(Math.random() * (255 - 0) + 0)]
                }
                i(xo, "randomRGBColor");

                function ke(t, e) {
                    const n = Kt().rgb.hsl(e);
                    t.style.setProperty("--label-r", e[0].toString()), t.style.setProperty("--label-g", e[1].toString()), t.style.setProperty("--label-b", e[2].toString()), t.style.setProperty("--label-h", n[0].toString()), t.style.setProperty("--label-s", n[1].toString()), t.style.setProperty("--label-l", n[2].toString())
                }
                i(ke, "setColorSwatch");

                function Mo(t, e) {
                    t.blur();
                    const n = t.closest("form"),
                        o = n.querySelector(".js-new-label-color-input");
                    (0, J.Se)(o, `#${Kt().rgb.hex(e)}`);
                    const s = n.querySelector(".js-new-label-color");
                    ke(s, e)
                }
                i(Mo, "setInputColorFromButton");

                function Dd(t, e) {
                    t.closest(".js-label-error-container").classList.add("errored"), t.textContent = e, t.hidden = !1
                }
                i(Dd, "addErrorToField");

                function Nd(t) {
                    t.closest(".js-label-error-container").classList.remove("errored"), t.hidden = !0
                }
                i(Nd, "removeErrorFromField");

                function ae(t, e, n) {
                    const o = e.querySelector(t);
                    !o || (n ? Dd(o, n[0]) : Nd(o))
                }
                i(ae, "showOrHideLabelError");

                function qo(t, e) {
                    ae(".js-label-name-error", t, e.name), ae(".js-label-description-error", t, e.description), ae(".js-label-color-error", t, e.color)
                }
                i(qo, "showLabelErrors");

                function Vt(t) {
                    ae(".js-label-name-error", t, null), ae(".js-label-description-error", t, null), ae(".js-label-color-error", t, null)
                }
                i(Vt, "hideLabelErrors");

                function Hd(t, e, n, o, s) {
                    const r = new URL(`${t}${encodeURIComponent(e)}`, window.location.origin),
                        a = new URLSearchParams(r.search.slice(1));
                    return a.append("color", n), o && a.append("description", o), s && a.append("id", s), r.search = a.toString(), r.toString()
                }
                i(Hd, "labelPreviewUrl");

                function Bd(t) {
                    let e = null;
                    const n = t.querySelector(".js-new-label-description-input");
                    return n instanceof HTMLInputElement && n.value.trim().length > 0 && (e = n.value.trim()), e
                }
                i(Bd, "labelDescriptionFrom");

                function _d(t) {
                    const e = t.querySelector(".js-new-label-color-input");
                    return e.checkValidity() ? e.value.trim().replace(/^#/, "") : "ededed"
                }
                i(_d, "labelColorFrom");

                function Od(t, e) {
                    let o = t.querySelector(".js-new-label-name-input").value.trim();
                    return o.length < 1 && (o = e.getAttribute("data-default-name")), o
                }
                i(Od, "labelNameFrom");
                async function ce(t) {
                    const e = t.closest(".js-label-preview-container");
                    if (!e) return;
                    const n = t.closest(".js-label-form"),
                        o = n.querySelector(".js-new-label-error"),
                        s = n.getAttribute("data-label-id"),
                        r = e.querySelector(".js-label-preview"),
                        a = Od(n, r);
                    if (!n.checkValidity() && a !== "Label preview") return;
                    const c = _d(n),
                        l = Bd(n),
                        f = r.getAttribute("data-url-template"),
                        p = Hd(f, a, c, l, s);
                    if (e.hasAttribute("data-last-preview-url")) {
                        const L = e.getAttribute("data-last-preview-url");
                        if (p === L) return
                    }
                    let E;
                    try {
                        E = await (0, ct.a)(document, p)
                    } catch (L) {
                        const T = await L.response.json();
                        qo(n, T), o && (o.textContent = T.message, o.hidden = !1);
                        return
                    }
                    o && (o.textContent = "", o.hidden = !0), Vt(n), r.innerHTML = "", r.appendChild(E), e.setAttribute("data-last-preview-url", p)
                }
                i(ce, "updateLabelPreview");

                function $d(t) {
                    ce(t.target)
                }
                i($d, "onLabelFormInputChange");

                function ci(t, e) {
                    t.closest(".js-details-container").classList.toggle("is-empty", e)
                }
                i(ci, "toggleBlankSlate");

                function li(t) {
                    const e = document.querySelector(".js-labels-count"),
                        o = Number(e.textContent) + t;
                    e.textContent = o.toString();
                    const s = document.querySelector(".js-labels-label");
                    return s.textContent = s.getAttribute(o === 1 ? "data-singular-string" : "data-plural-string"), o
                }
                i(li, "updateCount"), (0, X.q6)(".js-label-filter-field", function(t) {
                    const e = t.target,
                        o = e.closest("details-menu").querySelector(".js-new-label-name");
                    if (!o) return;
                    const s = e.value.trim();
                    o.textContent = s
                }), (0, d.on)("filterable:change", ".js-filterable-issue-labels", function(t) {
                    const e = t.currentTarget.closest("details-menu"),
                        n = e.querySelector(".js-add-label-button");
                    if (!n) return;
                    const s = t.detail.inputField.value.trim().toLowerCase();
                    let r = !1;
                    for (const a of e.querySelectorAll("input[data-label-name]"))
                        if ((a.getAttribute("data-label-name") || "").toLowerCase() === s) {
                            r = !0;
                            break
                        } n.hidden = s.length === 0 || r
                }), (0, X.ZG)(".js-new-label-color-input", function(t) {
                    const n = t.closest("form").querySelector(".js-new-label-swatches");
                    n.hidden = !1, t.addEventListener("blur", function() {
                        n.hidden = !0
                    }, {
                        once: !0
                    })
                }), (0, X.q6)(".js-new-label-color-input", function(t) {
                    const e = t.target;
                    let n = e.value.trim();
                    if (!(n.length < 1))
                        if (n.indexOf("#") !== 0 && (n = `#${n}`, e.value = n), e.checkValidity()) {
                            e.classList.remove("color-fg-danger");
                            const s = e.closest("form").querySelector(".js-new-label-color");
                            ke(s, Kt().hex.rgb(n))
                        } else e.classList.add("color-fg-danger")
                }), (0, X.w4)("keyup", ".js-new-label-color-input", function(t) {
                    const e = t.target;
                    let n = e.value.trim();
                    if (n.indexOf("#") !== 0 && (n = `#${n}`, e.value = n), e.checkValidity()) {
                        const r = e.closest("form").querySelector(".js-new-label-color");
                        ke(r, Kt().hex.rgb(n))
                    }(0, d.f)(e, "change", !1);
                    const o = e.closest("form");
                    Vt(o)
                }), (0, X.w4)("keyup", ".js-new-label-description-input", function(t) {
                    const n = t.target.form;
                    Vt(n)
                }), (0, X.w4)("keyup", ".js-new-label-color-input", function(t) {
                    const n = t.target.form;
                    Vt(n)
                }), (0, d.on)("click", ".js-new-label-color", async function(t) {
                    const e = t.currentTarget,
                        n = xo();
                    Mo(e, n), ce(e)
                }), (0, d.on)("mousedown", ".js-new-label-color-swatch", function(t) {
                    const e = t.currentTarget,
                        n = e.getAttribute("data-color");
                    Mo(e, Kt().hex.rgb(n)), ce(e);
                    const o = e.closest(".js-new-label-swatches");
                    o.hidden = !0
                }), (0, d.on)("toggle", ".js-new-label-modal", function(t) {
                    t.target.hasAttribute("open") && ui(t.target)
                }, {
                    capture: !0
                });
                async function ui(t) {
                    const e = t.querySelector(".js-new-label-name-input");
                    if (!e) return;
                    const n = t.querySelector(".js-new-label-color-input"),
                        o = xo(),
                        s = `#${Kt().rgb.hex(o)}`;
                    n.value = s;
                    const r = t.querySelector(".js-new-label-color");
                    ke(r, o);
                    const c = document.querySelector(".js-new-label-name").textContent;
                    (0, J.Se)(e, c), (0, Bn.OD)(e), ce(r)
                }
                i(ui, "initLabelModal"), (0, V.AC)(".js-new-label-modal-form", async function(t, e) {
                    const n = t.querySelector(".js-new-label-error");
                    let o;
                    try {
                        o = await e.html()
                    } catch (c) {
                        const l = c.response.json;
                        n.textContent = l.message, n.hidden = !1
                    }
                    if (!o) return;
                    n.hidden = !0, document.querySelector(".js-new-label-modal").removeAttribute("open");
                    const s = document.querySelector(".js-filterable-issue-labels"),
                        r = o.html.querySelector("input");
                    s.prepend(o.html), r && r.dispatchEvent(new Event("change", {
                        bubbles: !0
                    }));
                    const a = document.querySelector(".js-label-filter-field");
                    a.value = a.defaultValue, a.focus()
                }), (0, d.on)("click", ".js-edit-label-cancel", function(t) {
                    const e = t.target.closest("form");
                    Vt(e), e.reset();
                    const n = e.querySelector(".js-new-label-color-input"),
                        o = n.value,
                        s = e.querySelector(".js-new-label-color");
                    ke(s, Kt().hex.rgb(o)), (0, Bn.Qc)(e), ce(n);
                    const r = t.currentTarget.closest(".js-labels-list-item");
                    if (r) {
                        r.querySelector(".js-update-label").classList.add("d-none");
                        const c = r.querySelector(".js-label-preview");
                        c && (c.classList.add("d-none"), r.querySelector(".js-label-link").classList.remove("d-none"));
                        const l = r.querySelectorAll(".js-hide-on-label-edit");
                        for (const f of l) f.hidden = !f.hidden
                    }
                }), (0, V.AC)(".js-update-label", async function(t, e) {
                    let n;
                    try {
                        n = await e.html()
                    } catch (s) {
                        const r = s.response.json;
                        qo(t, r);
                        return
                    }
                    Vt(t), t.closest(".js-labels-list-item").replaceWith(n.html)
                }), (0, V.AC)(".js-create-label", async function(t, e) {
                    let n;
                    try {
                        n = await e.html()
                    } catch (a) {
                        const c = a.response.json;
                        qo(t, c);
                        return
                    }
                    t.reset(), Vt(t), document.querySelector(".js-label-list").prepend(n.html), li(1), ci(t, !1);
                    const o = t.querySelector(".js-new-label-color"),
                        s = xo();
                    Mo(o, s), ce(t.querySelector(".js-new-label-name-input")), (0, Bn.Qc)(t);
                    const r = t.closest(".js-details-container");
                    r instanceof HTMLElement && (0, Vn.Qp)(r)
                }), (0, d.on)("click", ".js-details-target-new-label", function() {
                    document.querySelector(".js-create-label").querySelector(".js-new-label-name-input").focus()
                }), (0, d.on)("click", ".js-edit-label", function(t) {
                    const e = t.currentTarget.closest(".js-labels-list-item"),
                        n = e.querySelector(".js-update-label");
                    n.classList.remove("d-none"), n.querySelector(".js-new-label-name-input").focus();
                    const s = e.querySelector(".js-label-preview");
                    s && (s.classList.remove("d-none"), e.querySelector(".js-label-link").classList.add("d-none"));
                    const r = e.querySelectorAll(".js-hide-on-label-edit");
                    for (const a of r) a.hidden = !a.hidden
                }), (0, V.AC)(".js-delete-label", async function(t, e) {
                    const n = t.closest(".js-labels-list-item");
                    n.querySelector(".js-label-delete-spinner").hidden = !1, await e.text();
                    const o = li(-1);
                    ci(t, o === 0), n.remove()
                });
                const jn = (0, te.D)($d, 500);
                (0, d.on)("suggester:complete", ".js-new-label-name-input", jn), (0, X.q6)(".js-new-label-name-input", jn), (0, X.q6)(".js-new-label-description-input", jn), (0, X.q6)(".js-new-label-color-input", jn), (0, X.w4)("keypress", ".js-new-label-name-input", function(t) {
                    const e = t.target,
                        n = parseInt(e.getAttribute("data-maxlength"));
                    (0, ne.rq)(e.value) >= n && t.preventDefault()
                }), (0, d.on)("click", ".js-issues-label-select-menu-item", function(t) {
                    !t.altKey && !t.shiftKey || (t.preventDefault(), t.stopPropagation(), t.altKey && (window.location.href = t.currentTarget.getAttribute("data-excluded-url")), t.shiftKey && (window.location.href = t.currentTarget.getAttribute("data-included-url")))
                }), (0, X.w4)("keydown", ".js-issues-label-select-menu-item", function(t) {
                    if (t.key !== "Enter" || !t.altKey && !t.shiftKey) return;
                    const e = t.currentTarget;
                    t.preventDefault(), t.stopPropagation(), e instanceof HTMLAnchorElement && (t.altKey && (window.location.href = e.getAttribute("data-excluded-url")), t.shiftKey && (window.location.href = e.getAttribute("data-included-url")))
                }), (0, d.on)("click", ".js-open-label-creation-modal", async function(t) {
                    t.stopImmediatePropagation();
                    const e = await (0, Pt.W)({
                        content: document.querySelector(".js-label-creation-template").content.cloneNode(!0),
                        detailsClass: "js-new-label-modal"
                    });
                    ui(e)
                }, {
                    capture: !0
                }), (0, d.on)("change", ".js-thread-notification-setting", Po), (0, d.on)("change", ".js-custom-thread-notification-option", Po), (0, d.on)("reset", ".js-custom-thread-settings-form", Po);

                function Po() {
                    const t = document.querySelector(".js-reveal-custom-thread-settings").checked,
                        e = !document.querySelector(".js-custom-thread-notification-option:checked"),
                        n = document.querySelector(".js-custom-thread-settings"),
                        o = document.querySelector("[data-custom-option-required-text]"),
                        s = t && e ? o.getAttribute("data-custom-option-required-text") : "";
                    o.setCustomValidity(s), n.hidden = !t
                }
                i(Po, "toggleEventSettings");
                var Fd = Object.defineProperty,
                    Ud = Object.getOwnPropertyDescriptor,
                    di = i((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? Ud(e, n) : e, r = t.length - 1, a; r >= 0; r--)(a = t[r]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && Fd(e, n, s), s
                    }, "sidebar_widget_decorateClass");
                let Io = i(class extends HTMLElement {
                    get activeClass() {
                        return this.getAttribute("active-class") || "collapsible-sidebar-widget-active"
                    }
                    get loadingClass() {
                        return this.getAttribute("loading-class") || "collapsible-sidebar-widget-loading"
                    }
                    get url() {
                        return this.getAttribute("url") || ""
                    }
                    get isOpen() {
                        return this.hasAttribute("open")
                    }
                    set isOpen(t) {
                        t ? this.setAttribute("open", "") : this.removeAttribute("open")
                    }
                    onKeyDown(t) {
                        if (t.code === "Enter" || t.code === "Space") return t.preventDefault(), this.load()
                    }
                    onMouseDown(t) {
                        return t.preventDefault(), this.load()
                    }
                    load() {
                        return this.pendingRequest ? this.pendingRequest.abort() : this.collapsible.hasAttribute("loaded") ? this.isOpen ? this.setClose() : this.setOpen() : (this.setLoading(), this.updateCollapsible())
                    }
                    setLoading() {
                        this.classList.add(this.loadingClass), this.classList.remove(this.activeClass)
                    }
                    setOpen() {
                        this.classList.add(this.activeClass), this.classList.remove(this.loadingClass), this.isOpen = !0
                    }
                    setClose() {
                        this.classList.remove(this.activeClass), this.classList.remove(this.loadingClass), this.isOpen = !1
                    }
                    handleAbort() {
                        this.pendingRequest = null, this.setClose()
                    }
                    async updateCollapsible() {
                        var t;
                        try {
                            this.pendingRequest = new AbortController, this.pendingRequest.signal.addEventListener("abort", () => this.handleAbort());
                            const e = await fetch(this.url, {
                                signal: (t = this.pendingRequest) == null ? void 0 : t.signal,
                                headers: {
                                    Accept: "text/html",
                                    "X-Requested-With": "XMLHttpRequest"
                                }
                            });
                            if (this.pendingRequest = null, !e.ok) return this.setClose();
                            const n = await e.text();
                            this.collapsible.innerHTML = n, this.collapsible.setAttribute("loaded", ""), this.setOpen()
                        } catch {
                            return this.pendingRequest = null, this.setClose()
                        }
                    }
                }, "CollapsibleSidebarWidgetElement");
                di([q.fA], Io.prototype, "collapsible", 2), Io = di([q.Ih], Io);
                var Wd = Object.defineProperty,
                    zd = Object.getOwnPropertyDescriptor,
                    Tt = i((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? zd(e, n) : e, r = t.length - 1, a; r >= 0; r--)(a = t[r]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && Wd(e, n, s), s
                    }, "sidebar_memex_input_decorateClass");
                let bt = i(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.url = "", this.csrf = "", this.instrument = "", this.column = 1
                    }
                    get isDisabled() {
                        var t;
                        return (t = this.read) == null ? void 0 : t.hasAttribute("disabled")
                    }
                    set hasErrored(t) {
                        t ? this.setAttribute("errored", "") : this.removeAttribute("errored")
                    }
                    set disabled(t) {
                        t ? this.setAttribute("disabled", "") : this.removeAttribute("disabled")
                    }
                    get hasExpanded() {
                        return this.read.getAttribute("aria-expanded") === "true"
                    }
                    connectedCallback() {
                        var t, e;
                        this.disabled = (e = (t = this.read) == null ? void 0 : t.disabled) != null ? e : !0, this.querySelector("details") !== null && this.classList.toggle("no-pointer")
                    }
                    handleDetailsSelect(t) {
                        var e;
                        const n = t,
                            o = t.target,
                            s = (e = n.detail) == null ? void 0 : e.relatedTarget,
                            r = o.closest("details"),
                            a = r == null ? void 0 : r.querySelector("[data-menu-button]");
                        if (s.getAttribute("aria-checked") === "true") {
                            s.setAttribute("aria-checked", "false"), t.preventDefault();
                            for (const c of this.inputs)
                                if (s.contains(c)) {
                                    this.updateCell(c.name, ""), (a == null ? void 0 : a.innerHTML) && (a.innerHTML = c.placeholder);
                                    break
                                } r == null || r.removeAttribute("open")
                        }
                    }
                    handleDetailsSelected(t) {
                        var e;
                        const o = (e = t.detail) == null ? void 0 : e.relatedTarget;
                        for (const s of this.inputs)
                            if (o.contains(s)) {
                                this.updateCell(s.name, s.value);
                                break
                            }
                    }
                    mouseDownFocus(t) {
                        !this.isDisabled || this.onFocus(t)
                    }
                    keyDownFocus(t) {
                        (t.code === "Enter" || t.code === "Space") && this.read !== document.activeElement && this.onFocus(t)
                    }
                    onChange(t) {
                        var e, n;
                        t.target.getAttribute("type") !== "date" && this.updateCell((e = this.read) == null ? void 0 : e.name, (n = this.read) == null ? void 0 : n.value)
                    }
                    onFocus(t) {
                        t.preventDefault(), this.disabled = !1, this.read.disabled = !1, this.read.focus()
                    }
                    onBlur(t) {
                        var e, n;
                        if (this.hasExpanded) {
                            t.preventDefault();
                            return
                        }
                        t.target.getAttribute("type") === "date" && this.updateCell((e = this.read) == null ? void 0 : e.name, (n = this.read) == null ? void 0 : n.value), this.read.disabled = !0, this.disabled = !0
                    }
                    onKeyDown(t) {
                        if (t.code === "Enter" || t.code === "Tab") {
                            if (t.preventDefault(), t.stopPropagation(), this.hasExpanded) return;
                            this.read.blur()
                        }
                    }
                    async updateCell(t = "", e = "") {
                        const n = new FormData;
                        n.set(t, e), n.set("ui", this.instrument);
                        for (const s of this.parameters) n.set(s.name, s.value);
                        const o = Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            timeZone: "UTC"
                        });
                        try {
                            if (this.write) {
                                const p = this.read.value,
                                    E = this.read.type === "date" && p ? o.format(Date.parse(p)) : p;
                                this.write.textContent = p ? E : this.read.placeholder
                            }
                            const s = await fetch(this.url, {
                                method: "PUT",
                                body: n,
                                headers: {
                                    Accept: "application/json",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Scoped-CSRF-Token": `${this.csrf}`
                                }
                            });
                            if (!s.ok) throw new Error("connection error");
                            if (!this.write) return;
                            const c = (await s.json()).memexProjectItem.memexProjectColumnValues.find(p => p.memexProjectColumnId === Number(this.column)).value,
                                l = this.read.type === "date" ? Date.parse(c.value) : c.html,
                                f = this.read.type === "date" && l ? o.format(l) : l;
                            this.write.innerHTML = e ? f : this.read.placeholder
                        } catch {
                            this.hasErrored = !0
                        }
                    }
                }, "SidebarMemexInputElement");
                Tt([q.Lj], bt.prototype, "url", 2), Tt([q.Lj], bt.prototype, "csrf", 2), Tt([q.Lj], bt.prototype, "instrument", 2), Tt([q.Lj], bt.prototype, "column", 2), Tt([q.GO], bt.prototype, "inputs", 2), Tt([q.fA], bt.prototype, "read", 2), Tt([q.fA], bt.prototype, "write", 2), Tt([q.GO], bt.prototype, "parameters", 2), bt = Tt([q.Ih], bt);

                function xe(t, e = !1) {
                    (e || !Vd(t)) && (t instanceof HTMLFormElement ? (0, J.Bt)(t) : Tn(t))
                }
                i(xe, "submitForm");

                function fi(t) {
                    const e = t.currentTarget,
                        n = e.closest(".js-issue-sidebar-form") || e.querySelector(".js-issue-sidebar-form");
                    xe(n)
                }
                i(fi, "submitOnMenuClose"), (0, d.on)("details-menu-selected", ".js-discussion-sidebar-menu", function(t) {
                    const e = t.detail.relatedTarget,
                        n = t.currentTarget,
                        o = e.closest(".js-issue-sidebar-form"),
                        s = n.hasAttribute("data-multiple");
                    if (e.hasAttribute("data-clear-assignees")) {
                        const r = n.querySelectorAll('input[name="issue[user_assignee_ids][]"]:checked');
                        for (const a of r) a.disabled = !1, a.checked = !1;
                        xe(o)
                    } else s ? n.closest("details").addEventListener("toggle", fi, {
                        once: !0
                    }) : xe(o)
                }, {
                    capture: !0
                });

                function Kd(t, e) {
                    t.replaceWith((0, wt.r)(document, e))
                }
                i(Kd, "updateSidebar");

                function mi(t) {
                    const e = document.querySelector(`[data-menu-trigger="${t}"]`);
                    e == null || e.focus()
                }
                i(mi, "returnFocusToTrigger"), (0, V.AC)(".js-issue-sidebar-form", async function(t, e) {
                    var n;
                    const o = await e.html(),
                        s = t.closest(".js-discussion-sidebar-item"),
                        r = (n = s == null ? void 0 : s.querySelector(".select-menu")) == null ? void 0 : n.getAttribute("id");
                    s.replaceWith(o.html), r && mi(r)
                }), (0, d.on)("click", "div.js-issue-sidebar-form .js-suggested-reviewer", function(t) {
                    const e = t.currentTarget,
                        n = e.closest(".js-issue-sidebar-form");
                    Tn(n, "post", {
                        name: e.name,
                        value: e.value
                    }), t.preventDefault()
                }), (0, d.on)("click", "div.js-issue-sidebar-form .js-issue-assign-self", function(t) {
                    var e;
                    const n = t.currentTarget,
                        o = n.closest(".js-issue-sidebar-form");
                    Tn(o, "post", {
                        name: n.name,
                        value: n.value
                    }), n.remove(), (e = document.querySelector("form#new_issue .is-submit-button-value")) == null || e.remove(), t.preventDefault()
                }), (0, d.on)("click", ".js-issue-unassign-self", function(t) {
                    const e = t.currentTarget.closest(".js-issue-sidebar-form");
                    Tn(e, "delete"), t.preventDefault()
                }), (0, V.AC)(".js-pages-preview-toggle-form", async function(t, e) {
                    const n = await e.json();
                    t.querySelector("button.btn").textContent = n.json.new_button_value
                });
                async function Tn(t, e = "post", n) {
                    var o;
                    const s = hi(t);
                    n && s.append(n.name, n.value);
                    const r = t.getAttribute("data-url");
                    if (!r) return;
                    const a = t.querySelector(".js-data-url-csrf"),
                        c = await fetch(r, {
                            method: e,
                            body: e === "delete" ? "" : s,
                            mode: "same-origin",
                            headers: {
                                "Scoped-CSRF-Token": a.value,
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        });
                    if (!c.ok) return;
                    const l = await c.text();
                    Kd(t.closest(".js-discussion-sidebar-item"), l);
                    const f = t.closest(".js-discussion-sidebar-item"),
                        p = (o = f == null ? void 0 : f.querySelector(".select-menu")) == null ? void 0 : o.getAttribute("id");
                    p && mi(p)
                }
                i(Tn, "previewSubmit");

                function Vd(t) {
                    const e = t.getAttribute("data-reviewers-team-size-check-url");
                    if (!e) return !1;
                    const n = [...document.querySelectorAll(".js-reviewer-team")].map(c => c.getAttribute("data-id")),
                        o = t instanceof HTMLFormElement ? new FormData(t) : hi(t),
                        r = new URLSearchParams(o).getAll("reviewer_team_ids[]").filter(c => !n.includes(c));
                    if (r.length === 0) return !1;
                    const a = new URLSearchParams(r.map(c => ["reviewer_team_ids[]", c]));
                    return Xd(t, `${e}?${a}`), !0
                }
                i(Vd, "reviewerTeamsCheckRequired");
                async function Xd(t, e) {
                    const n = await fetch(e);
                    if (!n.ok) return;
                    const o = await n.text();
                    if (o.match(/[^\w-]js-large-team[^\w-]/)) Gd(t, o);
                    else {
                        xe(t, !0);
                        return
                    }
                }
                i(Xd, "triggerTeamReviewerCheck");

                function Gd(t, e) {
                    const n = t.querySelector(".js-large-teams-check-warning-container");
                    for (; n.firstChild;) n.removeChild(n.firstChild);
                    n.appendChild((0, wt.r)(document, e));
                    const o = n.querySelector("details");

                    function s(r) {
                        if (r.target instanceof Element) {
                            if (o.open = !1, !r.target.classList.contains("js-large-teams-request-button")) {
                                const a = t.querySelectorAll("input[name='reviewer_team_ids[]']");
                                for (const c of a) n.querySelector(`.js-large-team[data-id='${c.value}']`) && (c.checked = !1)
                            }
                            xe(t, !0), r.preventDefault()
                        }
                    }
                    i(s, "dialogAction"), n.querySelector(".js-large-teams-request-button").addEventListener("click", s, {
                        once: !0
                    }), n.querySelector(".js-large-teams-do-not-request-button").addEventListener("click", s, {
                        once: !0
                    }), o.addEventListener("details-dialog-close", s, {
                        once: !0
                    }), o.open = !0
                }
                i(Gd, "showTeamReviewerConfirmationDialog"), (0, d.on)("click", "div.js-project-column-menu-container .js-project-column-menu-item button", async function(t) {
                    const e = t.currentTarget;
                    Zd(e);
                    const n = e.getAttribute("data-url"),
                        o = e.parentElement.querySelector(".js-data-url-csrf"),
                        s = e.getAttribute("data-card-id"),
                        r = new FormData;
                    if (r.append("card_id", s), r.append("use_automation_prioritization", "true"), t.preventDefault(), !(await fetch(n, {
                            method: "PUT",
                            mode: "same-origin",
                            body: r,
                            headers: {
                                "Scoped-CSRF-Token": o.value,
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        })).ok) return;
                    const c = document.activeElement,
                        l = e.closest(".js-project-column-menu-dropdown");
                    if (c && l.contains(c)) try {
                        c.blur()
                    } catch {}
                });

                function Zd(t) {
                    const n = t.closest(".js-project-column-menu-dropdown").querySelector(".js-project-column-menu-summary"),
                        o = t.getAttribute("data-column-name");
                    n.textContent = o
                }
                i(Zd, "updateProjectColumnMenuSummary"), (0, d.on)("click", ".js-prompt-dismiss", function(t) {
                    t.currentTarget.closest(".js-prompt").remove()
                });

                function hi(t) {
                    const e = t.closest("form"),
                        o = new FormData(e).entries(),
                        s = new FormData;
                    for (const [r, a] of o) e.contains(Jd(e, r, a.toString())) && s.append(r, a);
                    return s
                }
                i(hi, "scopedFormData");

                function Jd(t, e, n) {
                    for (const o of t.elements)
                        if ((o instanceof HTMLInputElement || o instanceof HTMLTextAreaElement || o instanceof HTMLButtonElement) && o.name === e && o.value === n) return o;
                    return null
                }
                i(Jd, "findParam"), (0, d.on)("click", ".js-convert-to-draft", function(t) {
                    const e = t.currentTarget.getAttribute("data-url"),
                        n = t.currentTarget.parentElement.querySelector(".js-data-url-csrf");
                    fetch(e, {
                        method: "POST",
                        mode: "same-origin",
                        headers: {
                            "Scoped-CSRF-Token": n.value,
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    })
                }), (0, d.on)("click", "div.js-restore-item", async function(t) {
                    const e = t.currentTarget.getAttribute("data-url"),
                        n = t.currentTarget.getAttribute("data-column"),
                        o = t.currentTarget.querySelector(".js-data-url-csrf"),
                        s = new FormData;
                    if (s.set("memexProjectItemIds[]", n), !(await fetch(e, {
                            method: "PUT",
                            mode: "same-origin",
                            body: s,
                            headers: {
                                "Scoped-CSRF-Token": o.value,
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        })).ok) throw new Error("connection error");
                    fi(t)
                })
            },
            1347: (D, k, u) => {
                "use strict";
                u.d(k, {
                    S: () => M
                });

                function S(b) {
                    const m = document.querySelectorAll(b);
                    if (m.length > 0) return m[m.length - 1]
                }
                i(S, "queryLast");

                function A() {
                    const b = S("meta[name=analytics-location]");
                    return b ? b.content : window.location.pathname
                }
                i(A, "pagePathname");

                function N() {
                    const b = S("meta[name=analytics-location-query-strip]");
                    let m = "";
                    b || (m = window.location.search);
                    const h = S("meta[name=analytics-location-params]");
                    h && (m += (m ? "&" : "?") + h.content);
                    for (const g of document.querySelectorAll("meta[name=analytics-param-rename]")) {
                        const w = g.content.split(":", 2);
                        m = m.replace(new RegExp(`(^|[?&])${w[0]}($|=)`, "g"), `$1${w[1]}$2`)
                    }
                    return m
                }
                i(N, "pageQuery");

                function M() {
                    return `${window.location.protocol}//${window.location.host}${A()+N()}`
                }
                i(M, "requestUri")
            },
            55566: () => {
                let D, k = !1;

                function u() {
                    D = document.activeElement, document.body && document.body.classList.toggle("intent-mouse", k)
                }
                i(u, "setClass"), document.addEventListener("mousedown", function() {
                    k = !0, D === document.activeElement && u()
                }, {
                    capture: !0
                }), document.addEventListener("keydown", function() {
                    k = !1
                }, {
                    capture: !0
                }), document.addEventListener("focusin", u, {
                    capture: !0
                })
            },
            57692: (D, k, u) => {
                "use strict";
                u.d(k, {
                    OD: () => m,
                    Qc: () => h,
                    nz: () => b
                });
                var S = u(41885),
                    A = u(66123);

                function N(g, w, C) {
                    const v = C.closest(".js-characters-remaining-container");
                    if (!v) return;
                    const x = v.querySelector(".js-characters-remaining"),
                        I = String(x.getAttribute("data-suffix")),
                        O = (0, S.rq)(g),
                        $ = w - O;
                    $ <= 20 ? (x.textContent = `${$} ${I}`, x.classList.toggle("color-fg-danger", $ <= 5), x.hidden = !1) : x.hidden = !0
                }
                i(N, "showRemainingCharacterCount");

                function M(g) {
                    return g.hasAttribute("data-maxlength") ? parseInt(g.getAttribute("data-maxlength") || "") : g.maxLength
                }
                i(M, "getFieldLimit");

                function b(g) {
                    const w = M(g),
                        C = (0, S.rq)(g.value);
                    return w - C < 0
                }
                i(b, "hasExceededCharacterLimit");

                function m(g) {
                    const w = M(g);
                    N(g.value, w, g)
                }
                i(m, "updateInputRemainingCharacters");

                function h(g) {
                    const w = g.querySelectorAll(".js-characters-remaining-container");
                    for (const C of w) {
                        const v = C.querySelector(".js-characters-remaining-field");
                        m(v)
                    }
                }
                i(h, "resetCharactersRemainingCounts"), (0, A.ZG)(".js-characters-remaining-field", function(g) {
                    function w() {
                        (g instanceof HTMLInputElement || g instanceof HTMLTextAreaElement) && m(g)
                    }
                    i(w, "onInput"), w(), g.addEventListener("input", w), g.addEventListener("blur", () => {
                        g.removeEventListener("input", w)
                    }, {
                        once: !0
                    })
                })
            },
            4904: () => {
                document.addEventListener("click", function(D) {
                    if (!(D.target instanceof Element)) return;
                    const k = "a[data-confirm], input[type=submit][data-confirm], input[type=checkbox][data-confirm], button[data-confirm]",
                        u = D.target.closest(k);
                    if (!u) return;
                    const S = u.getAttribute("data-confirm");
                    !S || u instanceof HTMLInputElement && u.hasAttribute("data-confirm-checked") && !u.checked || confirm(S) || (D.stopImmediatePropagation(), D.preventDefault())
                }, !0)
            },
            82161: () => {
                document.addEventListener("pjax:click", function(D) {
                    if (window.onbeforeunload) return D.preventDefault()
                })
            },
            30254: (D, k, u) => {
                "use strict";
                u.d(k, {
                    k: () => b
                });
                var S = u(27157),
                    A = u(2998),
                    N = u(30762),
                    M = u(68559);
                (0, N.N7)(".js-responsive-underlinenav", {
                    constructor: HTMLElement,
                    subscribe: g => (b(g), (0, S.RB)(window, "resize", () => h(g)))
                });
                async function b(g) {
                    await A.C, h(g)
                }
                i(b, "asyncCalculateVisibility");

                function m(g, w) {
                    g.style.visibility = w ? "hidden" : "";
                    const C = g.getAttribute("data-tab-item");
                    if (C) {
                        const v = document.querySelector(`[data-menu-item=${C}]`);
                        v instanceof HTMLElement && (v.hidden = !w)
                    }
                }
                i(m, "toggleItem");

                function h(g) {
                    const w = g.querySelectorAll(".js-responsive-underlinenav-item"),
                        C = g.querySelector(".js-responsive-underlinenav-overflow"),
                        v = (0, M.oE)(C, g);
                    if (!v) return;
                    let x = !1;
                    for (const I of w) {
                        const O = (0, M.oE)(I, g);
                        if (O) {
                            const $ = O.left + I.offsetWidth >= v.left;
                            m(I, $), x = x || $
                        }
                    }
                    C.style.visibility = x ? "" : "hidden"
                }
                i(h, "calculateVisibility")
            },
            94528: () => {
                document.addEventListener("pjax:end", function() {
                    const D = document.querySelector('meta[name="selected-link"]'),
                        k = D && D.getAttribute("value");
                    if (!!k)
                        for (const u of document.querySelectorAll(".js-sidenav-container-pjax .js-selected-navigation-item")) {
                            const S = (u.getAttribute("data-selected-links") || "").split(" ").indexOf(k) >= 0;
                            S ? u.setAttribute("aria-current", "page") : u.removeAttribute("aria-current"), u.classList.toggle("selected", S)
                        }
                })
            },
            85695: () => {
                function D(S) {
                    const A = document.querySelector(".js-stale-session-flash"),
                        N = A.querySelector(".js-stale-session-flash-signed-in"),
                        M = A.querySelector(".js-stale-session-flash-signed-out");
                    A.hidden = !1, N.hidden = S === "false", M.hidden = S === "true", window.addEventListener("popstate", function(b) {
                        b.state && b.state.container != null && location.reload()
                    }), document.addEventListener("submit", function(b) {
                        b.preventDefault()
                    })
                }
                i(D, "sessionChanged");
                let k;
                if (typeof BroadcastChannel == "function") try {
                    k = new BroadcastChannel("stale-session"), k.onmessage = S => {
                        typeof S.data == "string" && D(S.data)
                    }
                } catch {}
                if (!k) {
                    let S = !1;
                    k = {
                        postMessage(A) {
                            S = !0;
                            try {
                                window.localStorage.setItem("logged-in", A)
                            } finally {
                                S = !1
                            }
                        }
                    }, window.addEventListener("storage", function(A) {
                        if (!S && A.storageArea === window.localStorage && A.key === "logged-in") try {
                            (A.newValue === "true" || A.newValue === "false") && D(A.newValue)
                        } finally {
                            window.localStorage.removeItem(A.key)
                        }
                    })
                }
                const u = document.querySelector(".js-stale-session-flash[data-signedin]");
                if (u) {
                    const S = u.getAttribute("data-signedin") || "";
                    k.postMessage(S)
                }
            },
            811: (D, k, u) => {
                "use strict";
                var S = u(13178),
                    A = u(11427),
                    N = u(30762);
                class M {
                    constructor(m) {
                        this.container = m.container, this.selections = m.selections, this.inputWrap = m.inputWrap, this.input = m.input, this.tagTemplate = m.tagTemplate, this.form = this.input.form, this.autoComplete = m.autoComplete, this.multiTagInput = m.multiTagInput
                    }
                    setup() {
                        this.container.addEventListener("click", m => {
                            m.target.closest(".js-remove") ? this.removeTag(m) : this.onFocus()
                        }), this.input.addEventListener("focus", this.onFocus.bind(this)), this.input.addEventListener("blur", this.onBlur.bind(this)), this.input.addEventListener("keydown", this.onKeyDown.bind(this)), this.form.addEventListener("submit", this.onSubmit.bind(this)), this.autoComplete.addEventListener("auto-complete-change", () => {
                            this.selectTag(this.autoComplete.value)
                        })
                    }
                    onFocus() {
                        this.inputWrap.classList.add("focus"), this.input !== document.activeElement && this.input.focus()
                    }
                    onBlur() {
                        this.inputWrap.classList.remove("focus"), this.autoComplete.open || this.onSubmit()
                    }
                    onSubmit() {
                        this.input.value && (this.selectTag(this.input.value), this.autoComplete.open = !1)
                    }
                    onKeyDown(m) {
                        switch ((0, S.EL)(m)) {
                            case "Backspace":
                                this.onBackspace();
                                break;
                            case "Enter":
                            case "Tab":
                                this.taggifyValueWhenSuggesterHidden(m);
                                break;
                            case ",":
                            case " ":
                                this.taggifyValue(m);
                                break
                        }
                    }
                    taggifyValueWhenSuggesterHidden(m) {
                        !this.autoComplete.open && this.input.value && (m.preventDefault(), this.selectTag(this.input.value))
                    }
                    taggifyValue(m) {
                        this.input.value && (m.preventDefault(), this.selectTag(this.input.value), this.autoComplete.open = !1)
                    }
                    selectTag(m) {
                        const h = this.normalizeTag(m),
                            g = this.selectedTags();
                        let w = !1;
                        for (let C = 0; C < h.length; C++) {
                            const v = h[C];
                            g.indexOf(v) < 0 && (this.selections.appendChild(this.templateTag(v)), w = !0)
                        }
                        w && (this.input.value = "", (0, A.f)(this.form, "tags:changed"))
                    }
                    removeTag(m) {
                        const h = m.target;
                        m.preventDefault(), h.closest(".js-tag-input-tag").remove(), (0, A.f)(this.form, "tags:changed")
                    }
                    templateTag(m) {
                        const h = this.tagTemplate.cloneNode(!0);
                        return h.querySelector("input").value = m, h.querySelector(".js-placeholder-tag-name").replaceWith(m), h.classList.remove("d-none", "js-template"), h
                    }
                    normalizeTag(m) {
                        const h = m.toLowerCase().trim();
                        return h ? this.multiTagInput ? h.split(/[\s,']+/) : [h.replace(/[\s,']+/g, "-")] : []
                    }
                    onBackspace() {
                        if (!this.input.value) {
                            const m = this.selections.querySelector("li:last-child .js-remove");
                            m instanceof HTMLElement && m.click()
                        }
                    }
                    selectedTags() {
                        const m = this.selections.querySelectorAll("input");
                        return Array.from(m).map(h => h.value).filter(h => h.length > 0)
                    }
                }
                i(M, "TagInput"), (0, N.N7)(".js-tag-input-container", {
                    constructor: HTMLElement,
                    initialize(b) {
                        new M({
                            container: b,
                            inputWrap: b.querySelector(".js-tag-input-wrapper"),
                            input: b.querySelector('input[type="text"], input:not([type])'),
                            selections: b.querySelector(".js-tag-input-selected-tags"),
                            tagTemplate: b.querySelector(".js-template"),
                            autoComplete: b.querySelector("auto-complete"),
                            multiTagInput: !1
                        }).setup()
                    }
                }), (0, N.N7)(".js-multi-tag-input-container", {
                    constructor: HTMLElement,
                    initialize(b) {
                        new M({
                            container: b,
                            inputWrap: b.querySelector(".js-tag-input-wrapper"),
                            input: b.querySelector('input[type="text"], input:not([type])'),
                            selections: b.querySelector(".js-tag-input-selected-tags"),
                            tagTemplate: b.querySelector(".js-template"),
                            autoComplete: b.querySelector("auto-complete"),
                            multiTagInput: !0
                        }).setup()
                    }
                })
            },
            4364: (D, k, u) => {
                "use strict";
                u.d(k, {
                    P: () => N,
                    g: () => M
                });
                var S = u(11427);
                const A = new WeakMap;

                function N(h) {
                    return A.get(h)
                }
                i(N, "getCodeEditor");
                async function M(h) {
                    return A.get(h) || b(await m(h, "codeEditor:ready"))
                }
                i(M, "getAsyncCodeEditor");

                function b(h) {
                    if (!(h instanceof CustomEvent)) throw new Error("assert: event is not a CustomEvent");
                    const g = h.detail.editor;
                    if (!h.target) throw new Error("assert: event.target is null");
                    return A.set(h.target, g), g
                }
                i(b, "onEditorFromEvent"), (0, S.on)("codeEditor:ready", ".js-code-editor", b);

                function m(h, g) {
                    return new Promise(w => {
                        h.addEventListener(g, w, {
                            once: !0
                        })
                    })
                }
                i(m, "nextEvent")
            },
            93632: (D, k, u) => {
                "use strict";
                u.d(k, {
                    $1: () => S,
                    d8: () => N,
                    kT: () => M
                });

                function S(b) {
                    const m = [];
                    for (const h of A()) {
                        const [g, w] = h.trim().split("=");
                        b === g && typeof w != "undefined" && m.push({
                            key: g,
                            value: w
                        })
                    }
                    return m
                }
                i(S, "getCookies");

                function A() {
                    try {
                        return document.cookie.split(";")
                    } catch {
                        return []
                    }
                }
                i(A, "readCookies");

                function N(b, m, h = null, g = !1, w = "lax") {
                    let C = document.domain;
                    if (C == null) throw new Error("Unable to get document domain");
                    C.endsWith(".github.com") && (C = "github.com");
                    const v = location.protocol === "https:" ? "; secure" : "",
                        x = h ? `; expires=${h}` : "";
                    g === !1 && (C = `.${C}`);
                    try {
                        document.cookie = `${b}=${m}; path=/; domain=${C}${x}${v}; samesite=${w}`
                    } catch {}
                }
                i(N, "setCookie");

                function M(b, m = !1) {
                    let h = document.domain;
                    if (h == null) throw new Error("Unable to get document domain");
                    h.endsWith(".github.com") && (h = "github.com");
                    const g = new Date().getTime(),
                        w = new Date(g - 1).toUTCString(),
                        C = location.protocol === "https:" ? "; secure" : "",
                        v = `; expires=${w}`;
                    m === !1 && (h = `.${h}`);
                    try {
                        document.cookie = `${b}=''; path=/; domain=${h}${v}${C}`
                    } catch {}
                }
                i(M, "deleteCookie")
            },
            99510: (D, k, u) => {
                "use strict";
                u.d(k, {
                    LN: () => w,
                    aJ: () => mt,
                    cI: () => $,
                    eK: () => v,
                    mT: () => C
                });
                var S = u(40411),
                    A = u(9534),
                    N = u(77997),
                    M = u(45316),
                    b = u(1347);
                let m = !1,
                    h = 0;
                const g = Date.now();

                function w(K) {
                    K.error && x(O(I(K.error)))
                }
                i(w, "reportEvent");
                async function C(K) {
                    if (!!K.promise) try {
                        await K.promise
                    } catch (G) {
                        x(O(I(G)))
                    }
                }
                i(C, "reportPromiseRejectionEvent");

                function v(K, G = {}) {
                    K && K.name !== "AbortError" && x(O(I(K), G))
                }
                i(v, "reportError");
                async function x(K) {
                    var G, j;
                    if (!ft()) return;
                    const R = (j = (G = document.head) == null ? void 0 : G.querySelector('meta[name="browser-errors-url"]')) == null ? void 0 : j.content;
                    if (!!R) {
                        if (ot(K.error.stacktrace)) {
                            m = !0;
                            return
                        }
                        h++;
                        try {
                            await fetch(R, {
                                method: "post",
                                body: JSON.stringify(K)
                            })
                        } catch {}
                    }
                }
                i(x, "report");

                function I(K) {
                    return {
                        type: K.name,
                        value: K.message,
                        stacktrace: $(K)
                    }
                }
                i(I, "formatError");

                function O(K, G = {}) {
                    return Object.assign({
                        error: K,
                        sanitizedUrl: (0, b.S)() || window.location.href,
                        readyState: document.readyState,
                        referrer: document.referrer,
                        timeSinceLoad: Math.round(Date.now() - g),
                        user: mt() || void 0,
                        bundler: At()
                    }, G)
                }
                i(O, "errorContext");

                function $(K) {
                    return (0, M.Q)(K.stack || "").map(G => ({
                        filename: G.file || "",
                        function: String(G.methodName),
                        lineno: (G.lineNumber || 0).toString(),
                        colno: (G.column || 0).toString()
                    }))
                }
                i($, "stacktrace");
                const nt = /(chrome|moz|safari)-extension:\/\//;

                function ot(K) {
                    return K.some(G => nt.test(G.filename) || nt.test(G.function))
                }
                i(ot, "isExtensionError");

                function mt() {
                    var K, G;
                    const j = (G = (K = document.head) == null ? void 0 : K.querySelector('meta[name="user-login"]')) == null ? void 0 : G.content;
                    return j || `anonymous-${(0,A.b)()}`
                }
                i(mt, "pageUser");
                let ht = !1;
                window.addEventListener("pageshow", () => ht = !1), window.addEventListener("pagehide", () => ht = !0);

                function ft() {
                    return !ht && !m && h < 10 && (0, N.Gb)() && !(0, S.Z)(document)
                }
                i(ft, "reportable");

                function At() {
                    return "System" in window ? "rollup" : "webpack"
                }
                i(At, "bundlerName"), typeof BroadcastChannel == "function" && new BroadcastChannel("shared-worker-error").addEventListener("message", G => {
                    v(G.data.error)
                })
            },
            98129: (D, k, u) => {
                "use strict";
                u.d(k, {
                    Y: () => b,
                    q: () => m
                });
                var S = u(67671),
                    A = u(47242);
                const N = "dimension_";
                let M;
                try {
                    const h = (0, S.n)("octolytics");
                    if (h.baseContext) {
                        delete h.baseContext.app_id, delete h.baseContext.event_url, delete h.baseContext.host;
                        for (const w in h.baseContext) w.startsWith(N) && (h.baseContext[w.replace(N, "")] = h.baseContext[w], delete h.baseContext[w])
                    }
                    const g = document.querySelector("meta[name=visitor-payload]");
                    if (g) {
                        const w = JSON.parse(atob(g.content)),
                            C = h.baseContext || {};
                        Object.assign(C, w), h.baseContext = C
                    }
                    M = new A.R(h)
                } catch {}

                function b(h) {
                    M == null || M.sendPageView(h)
                }
                i(b, "sendPageView");

                function m(h, g) {
                    var w, C;
                    const v = (C = (w = document.head) == null ? void 0 : w.querySelector('meta[name="current-catalog-service"]')) == null ? void 0 : C.content,
                        x = v ? {
                            service: v
                        } : {};
                    for (const [I, O] of Object.entries(g)) O != null && (x[I] = `${O}`);
                    M == null || M.sendEvent(h || "unknown", x)
                }
                i(m, "sendEvent")
            },
            4463: (D, k, u) => {
                "use strict";
                u.d(k, {
                    $S: () => A,
                    Fk: () => N,
                    sz: () => M
                });
                var S = u(76343);

                function A(b, m, h) {
                    const g = {
                            hydroEventPayload: b,
                            hydroEventHmac: m,
                            visitorPayload: "",
                            visitorHmac: "",
                            hydroClientContext: h
                        },
                        w = document.querySelector("meta[name=visitor-payload]");
                    w instanceof HTMLMetaElement && (g.visitorPayload = w.content);
                    const C = document.querySelector("meta[name=visitor-hmac]") || "";
                    C instanceof HTMLMetaElement && (g.visitorHmac = C.content), (0, S.b)(g, !0)
                }
                i(A, "sendData");

                function N(b) {
                    const m = b.getAttribute("data-hydro-view") || "",
                        h = b.getAttribute("data-hydro-view-hmac") || "",
                        g = b.getAttribute("data-hydro-client-context") || "";
                    A(m, h, g)
                }
                i(N, "trackView");

                function M(b) {
                    const m = b.getAttribute("data-hydro-click-payload") || "",
                        h = b.getAttribute("data-hydro-click-hmac") || "",
                        g = b.getAttribute("data-hydro-client-context") || "";
                    A(m, h, g)
                }
                i(M, "sendHydroEvent")
            },
            18539: (D, k, u) => {
                "use strict";
                var S = u(61075);
                window.IncludeFragmentElement.prototype.fetch = A => (A.headers.append("X-Requested-With", "XMLHttpRequest"), window.fetch(A))
            },
            41514: (D, k, u) => {
                "use strict";
                u.d(k, {
                    vt: () => ot,
                    WF: () => nt,
                    DV: () => $,
                    jW: () => At,
                    Nc: () => v,
                    $t: () => N
                });
                const S = {
                    frequency: .6,
                    recency: .4
                };

                function A(j, R) {
                    return j.sort((H, W) => R(H) - R(W))
                }
                i(A, "sortBy");

                function N(j) {
                    const R = b(j),
                        H = m(j);
                    return function(W) {
                        return M(R.get(W) || 0, H.get(W) || 0)
                    }
                }
                i(N, "scorer");

                function M(j, R) {
                    return j * S.frequency + R * S.recency
                }
                i(M, "score");

                function b(j) {
                    const R = [...Object.values(j)].reduce((H, W) => H + W.visitCount, 0);
                    return new Map(Object.keys(j).map(H => [H, j[H].visitCount / R]))
                }
                i(b, "frequencyMap");

                function m(j) {
                    const R = A([...Object.keys(j)], W => j[W].lastVisitedAt),
                        H = R.length;
                    return new Map(R.map((W, Y) => [W, (Y + 1) / H]))
                }
                i(m, "recencyMap");
                const h = /^\/orgs\/([a-z0-9-]+)\/teams\/([\w-]+)/,
                    g = [/^\/([^/]+)\/([^/]+)\/?$/, /^\/([^/]+)\/([^/]+)\/blob/, /^\/([^/]+)\/([^/]+)\/tree/, /^\/([^/]+)\/([^/]+)\/issues/, /^\/([^/]+)\/([^/]+)\/pulls?/, /^\/([^/]+)\/([^/]+)\/pulse/],
                    w = [
                        ["organization", /^\/orgs\/([a-z0-9-]+)\/projects\/([0-9-]+)/],
                        ["repository", /^\/([^/]+)\/([^/]+)\/projects\/([0-9-]+)/]
                    ],
                    C = 100;

                function v(j) {
                    const R = j.match(h);
                    if (R) {
                        I($(R[1], R[2]));
                        return
                    }
                    let H;
                    for (let Y = 0, lt = w.length; Y < lt; Y++) {
                        const [vt, $t] = w[Y];
                        if (H = j.match($t), H) {
                            let it = null,
                                Gt = null;
                            switch (vt) {
                                case "organization":
                                    it = H[1], Gt = H[2];
                                    break;
                                case "repository":
                                    it = `${H[1]}/${H[2]}`, Gt = H[3];
                                    break;
                                default:
                            }
                            it && Gt && I(ot(it, Gt));
                            return
                        }
                    }
                    let W;
                    for (let Y = 0, lt = g.length; Y < lt; Y++)
                        if (W = j.match(g[Y]), W) {
                            I(nt(W[1], W[2]));
                            return
                        }
                }
                i(v, "logPageView");

                function x(j) {
                    const R = Object.keys(j);
                    if (R.length <= C) return j;
                    const H = N(j),
                        W = R.sort((Y, lt) => H(lt) - H(Y)).slice(0, C / 2);
                    return Object.fromEntries(W.map(Y => [Y, j[Y]]))
                }
                i(x, "limitedPageViews");

                function I(j) {
                    const R = At(),
                        H = O(),
                        W = R[j] || {
                            lastVisitedAt: H,
                            visitCount: 0
                        };
                    W.visitCount += 1, W.lastVisitedAt = H, R[j] = W, ft(x(R))
                }
                i(I, "logPageViewByKey");

                function O() {
                    return Math.floor(Date.now() / 1e3)
                }
                i(O, "currentEpochTimeInSeconds");

                function $(j, R) {
                    return `team:${j}/${R}`
                }
                i($, "buildTeamKey");

                function nt(j, R) {
                    return `repository:${j}/${R}`
                }
                i(nt, "buildRepositoryKey");

                function ot(j, R) {
                    return `project:${j}/${R}`
                }
                i(ot, "buildProjectKey");
                const mt = /^(team|repository|project):[^/]+\/[^/]+(\/([^/]+))?$/,
                    ht = "jump_to:page_views";

                function ft(j) {
                    K(ht, JSON.stringify(j))
                }
                i(ft, "setPageViewsMap");

                function At() {
                    const j = G(ht);
                    if (!j) return {};
                    let R;
                    try {
                        R = JSON.parse(j)
                    } catch {
                        return ft({}), {}
                    }
                    const H = {};
                    for (const W in R) W.match(mt) && (H[W] = R[W]);
                    return H
                }
                i(At, "getPageViewsMap");

                function K(j, R) {
                    try {
                        window.localStorage.setItem(j, R)
                    } catch {}
                }
                i(K, "setItem");

                function G(j) {
                    try {
                        return window.localStorage.getItem(j)
                    } catch {
                        return null
                    }
                }
                i(G, "getItem")
            },
            5628: (D, k, u) => {
                "use strict";
                u.d(k, {
                    a: () => S
                });

                function S(b, m) {
                    const h = b.closest("[data-notification-id]");
                    m.hasAttribute("data-status") && A(h, m.getAttribute("data-status")), m.hasAttribute("data-subscription-status") && N(h, m.getAttribute("data-subscription-status")), m.hasAttribute("data-starred-status") && M(h, m.getAttribute("data-starred-status"))
                }
                i(S, "updateNotificationStates");

                function A(b, m) {
                    b.classList.toggle("notification-archived", m === "archived"), b.classList.toggle("notification-unread", m === "unread"), b.classList.toggle("notification-read", m === "read")
                }
                i(A, "toggleNotificationStatus");

                function N(b, m) {
                    b.classList.toggle("notification-unsubscribed", m === "unsubscribed")
                }
                i(N, "toggleNotificationSubscriptionStatus");

                function M(b, m) {
                    b.classList.toggle("notification-starred", m === "starred")
                }
                i(M, "toggleNotificationStarredStatus")
            },
            77873: (D, k, u) => {
                "use strict";
                u.d(k, {
                    X: () => A
                });
                var S = u(30762);

                function A() {
                    return /Windows/.test(navigator.userAgent) ? "windows" : /Macintosh/.test(navigator.userAgent) ? "mac" : null
                }
                i(A, "getPlatform");

                function N(M) {
                    const b = (M.getAttribute("data-platforms") || "").split(","),
                        m = A();
                    return Boolean(m && b.includes(m))
                }
                i(N, "runningOnPlatform"), (0, S.N7)(".js-remove-unless-platform", function(M) {
                    N(M) || M.remove()
                })
            },
            16267: (D, k, u) => {
                "use strict";
                u.d(k, {
                    LS: () => N,
                    cl: () => M,
                    rV: () => A
                });
                var S = u(39800);
                const {
                    getItem: A,
                    setItem: N,
                    removeItem: M
                } = (0, S.Z)("sessionStorage")
            },
            10555: (D, k, u) => {
                "use strict";
                u.d(k, {
                    kc: () => M,
                    lA: () => b,
                    zT: () => N
                });
                var S = u(67647),
                    A = u(1868);

                function N(m) {
                    const h = m.ownerDocument;
                    setTimeout(() => {
                        h && h.defaultView && (m.scrollIntoView(), h.defaultView.scrollBy(0, -b(h)))
                    }, 0)
                }
                i(N, "scrollIntoView");

                function M(m) {
                    const h = (0, S.Kt)(m);
                    h && N(h)
                }
                i(M, "scrollToFragmentTarget");

                function b(m) {
                    (0, A.H)();
                    const h = m.querySelectorAll(".js-sticky-offset-scroll"),
                        g = m.querySelectorAll(".js-position-sticky"),
                        w = Math.max(0, ...Array.from(h).map(x => {
                            const {
                                top: I,
                                height: O
                            } = x.getBoundingClientRect();
                            return I === 0 ? O : 0
                        })) + Math.max(0, ...Array.from(g).map(x => {
                            const {
                                top: I,
                                height: O
                            } = x.getBoundingClientRect(), $ = parseInt(getComputedStyle(x).top);
                            if (!x.parentElement) return 0;
                            const nt = x.parentElement.getBoundingClientRect().top;
                            return I === $ && nt < 0 ? O : 0
                        })),
                        C = m.querySelectorAll(".js-position-sticky-stacked"),
                        v = Array.from(C).reduce((x, I) => {
                            const {
                                height: O,
                                top: $
                            } = I.getBoundingClientRect(), nt = $ < 0, ot = I.classList.contains("is-stuck");
                            return x + (!nt && ot ? O : 0)
                        }, 0);
                    return w + v
                }
                i(b, "computeFixedYOffset")
            },
            8758: (D, k, u) => {
                "use strict";
                u.d(k, {
                    Z: () => C
                });
                var S = u(18137),
                    A = u(16393),
                    N = u(66789),
                    M = u(15851);
                let b = !1;

                function m(v) {
                    const x = new URL(v, window.location.origin),
                        I = new URLSearchParams(x.search.slice(1));
                    return I.set("webauthn-support", (0, M.T)()), x.search = I.toString(), x.toString()
                }
                i(m, "urlWithParams");
                async function h() {
                    const v = document.querySelector("link[rel=sudo-modal]"),
                        x = document.querySelector(".js-sudo-prompt");
                    if (x instanceof HTMLTemplateElement) return x;
                    if (v) {
                        const I = await (0, A.a)(document, m(v.href));
                        return document.body.appendChild(I), document.querySelector(".js-sudo-prompt")
                    } else throw new Error("couldn't load sudo prompt")
                }
                i(h, "loadPromptTemplate");
                let g = !1;
                async function w() {
                    if (b) return !1;
                    b = !0, g = !1;
                    const x = (await h()).content.cloneNode(!0),
                        I = await (0, S.W)({
                            content: x
                        });
                    return await new Promise(O => {
                        I.addEventListener("dialog:remove", function() {
                            b = !1, O()
                        }, {
                            once: !0
                        })
                    }), g
                }
                i(w, "sudoPrompt"), (0, N.AC)(".js-sudo-form", async function(v, x) {
                    try {
                        await x.text()
                    } catch (I) {
                        if (!I.response) throw I;
                        let O;
                        switch (I.response.status) {
                            case 401:
                                O = "Incorrect password.";
                                break;
                            case 429:
                                O = "Too many password attempts. Please wait and try again later.";
                                break;
                            default:
                                O = "Failed to receive a response. Please try again later."
                        }
                        v.querySelector(".js-sudo-error").textContent = O, v.querySelector(".js-sudo-error").hidden = !1, v.querySelector(".js-sudo-password").value = "";
                        return
                    }
                    g = !0, v.closest("details").removeAttribute("open")
                });
                async function C() {
                    const v = await fetch("/sessions/in_sudo", {
                        headers: {
                            accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    });
                    return v.ok && await v.text() === "true" ? !0 : w()
                }
                i(C, "triggerSudoPrompt")
            },
            41885: (D, k, u) => {
                "use strict";
                u.d(k, {
                    Om: () => M,
                    lp: () => A,
                    rq: () => S,
                    t4: () => N
                });

                function S(m) {
                    const h = "\u200D",
                        g = m.split(h);
                    let w = 0;
                    for (const C of g) w += Array.from(C.split(/[\ufe00-\ufe0f]/).join("")).length;
                    return w / g.length
                }
                i(S, "getUtf8StringLength");

                function A(m, h, g) {
                    let w = m.value.substring(0, m.selectionEnd || 0),
                        C = m.value.substring(m.selectionEnd || 0);
                    return w = w.replace(h, g), C = C.replace(h, g), b(m, w + C, w.length), g
                }
                i(A, "replaceText");

                function N(m, h, g) {
                    if (m.selectionStart === null || m.selectionEnd === null) return A(m, h, g);
                    const w = m.value.substring(0, m.selectionStart),
                        C = m.value.substring(m.selectionEnd);
                    return b(m, w + g + C, w.length), g
                }
                i(N, "replaceSelection");

                function M(m, h, g = {}) {
                    const w = m.selectionEnd || 0,
                        C = m.value.substring(0, w),
                        v = m.value.substring(w),
                        x = m.value === "" || C.match(/\n$/) ? "" : `
`,
                        I = g.appendNewline ? `
` : "",
                        O = x + h + I;
                    m.value = C + O + v;
                    const $ = w + O.length;
                    return m.selectionStart = $, m.selectionEnd = $, m.dispatchEvent(new CustomEvent("change", {
                        bubbles: !0,
                        cancelable: !1
                    })), m.focus(), O
                }
                i(M, "insertText");

                function b(m, h, g) {
                    m.value = h, m.selectionStart = g, m.selectionEnd = g, m.dispatchEvent(new CustomEvent("change", {
                        bubbles: !0,
                        cancelable: !1
                    }))
                }
                i(b, "setTextareaValueAndCursor")
            },
            15851: (D, k, u) => {
                "use strict";
                u.d(k, {
                    T: () => A,
                    k: () => N
                });
                var S = u(94745);

                function A() {
                    return (0, S.Zh)() ? "supported" : "unsupported"
                }
                i(A, "webauthnSupportLevel");
                async function N() {
                    var M;
                    return await ((M = window.PublicKeyCredential) == null ? void 0 : M.isUserVerifyingPlatformAuthenticatorAvailable()) ? "supported" : "unsupported"
                }
                i(N, "iuvpaaSupportLevel")
            }
        },
        D => {
            var k = i(S => D(D.s = S), "__webpack_exec__");
            D.O(0, [762, 8933, 52, 7105, 2308, 9048, 9758, 2662, 4686, 8851, 1316, 6832], () => k(16861));
            var u = D.O()
        }
    ]);
})();

//# sourceMappingURL=behaviors-26b4b8dc5ee7.js.map