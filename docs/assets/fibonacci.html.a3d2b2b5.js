import{_ as p,r as e,o as t,a as o,b as n,d as c,F as l,f as s,e as r}from"./app.c052f68f.js";const u={},i=s("\u9898\u53F7\uFF1A"),k={href:"https://www.lintcode.com/problem/366/",target:"_blank",rel:"noopener noreferrer"},b=s("366"),m=n("br",null,null,-1),d=s(" \u63CF\u8FF0\uFF1A\u67E5\u627E\u6590\u6CE2\u7EB3\u5951\u6570\u5217\u4E2D\u7B2C N \u4E2A\u6570\u3002"),y=r(`<blockquote><p>\u6240\u8C13\u7684\u6590\u6CE2\u7EB3\u5951\u6570\u5217\u662F\u6307\uFF1A<br> \u524D2\u4E2A\u6570\u662F 0 \u548C 1 \u3002<br> \u7B2C i \u4E2A\u6570\u662F\u7B2C i-1 \u4E2A\u6570\u548C\u7B2Ci-2 \u4E2A\u6570\u7684\u548C\u3002<br> \u6590\u6CE2\u7EB3\u5951\u6570\u5217\u7684\u524D10\u4E2A\u6570\u5B57\u662F\uFF1A<br> 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ...</p></blockquote><p>python</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    @param n: an integer
    @return: an ineger f(n)
    &quot;&quot;&quot;</span>
    <span class="token keyword">def</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># write your code here</span>
        <span class="token keyword">if</span> n <span class="token operator">&lt;=</span> <span class="token number">2</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> n <span class="token operator">-</span> <span class="token number">1</span>
        
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>fibonacci<span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> self<span class="token punctuation">.</span>fibonacci<span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>java</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// \u5FAA\u73AF</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@param</span> <span class="token parameter">n</span>: an integer
     * <span class="token keyword">@return</span>: an ineger f(n)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> c <span class="token operator">=</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
            a <span class="token operator">=</span> b<span class="token punctuation">;</span>
            b <span class="token operator">=</span> c<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> a<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// \u9012\u5F52</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@param</span> <span class="token parameter">n</span>: an integer
     * <span class="token keyword">@return</span>: an ineger f(n)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;=</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div>`,5);function f(w,_){const a=e("ExternalLinkIcon");return t(),o(l,null,[n("blockquote",null,[n("p",null,[i,n("a",k,[b,c(a)]),m,d])]),y],64)}var h=p(u,[["render",f]]);export{h as default};
