import{_ as n,e as s}from"./app.56db0ab9.js";const a={},p=s(`<p>\xA0</p><h1 id="\u94FE\u8868" tabindex="-1"><a class="header-anchor" href="#\u94FE\u8868" aria-hidden="true">#</a> \u94FE\u8868</h1><p>\u4F18\u70B9\uFF1A\u771F\u6B63\u7684\u52A8\u6001\uFF0C\u4E0D\u9700\u8981\u5904\u7406\u56FA\u5B9A\u5BB9\u91CF\u7684\u95EE\u9898</p><p>\u7F3A\u70B9\uFF1A\u4E27\u5931\u4E86\u968F\u673A\u8BBF\u95EE\u7684\u80FD\u529B</p><h2 id="\u6570\u636E\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u7ED3\u6784" aria-hidden="true">#</a> \u6570\u636E\u7ED3\u6784</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> e<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Node</span> next<span class="token punctuation">;</span>
    <span class="token comment">// \u6784\u9020\u65B9\u6CD5</span>
    <span class="token keyword">public</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">,</span> <span class="token class-name">Node</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>e <span class="token operator">=</span> e<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> e<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token class-name">Node</span> head<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> size<span class="token punctuation">;</span>

<span class="token comment">// \u94FE\u8868\u521D\u59CB\u5316</span>
<span class="token keyword">public</span> <span class="token class-name">LinkList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    head <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u83B7\u53D6\u94FE\u8868\u7684\u5143\u7D20\u4E2A\u6570</span>
<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> size<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8FD4\u56DE\u94FE\u8868\u662F\u5426\u4E3A\u7A7A</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> size <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><h2 id="crud" tabindex="-1"><a class="header-anchor" href="#crud" aria-hidden="true">#</a> CRUD</h2><h3 id="create" tabindex="-1"><a class="header-anchor" href="#create" aria-hidden="true">#</a> Create</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// \u5728\u94FE\u8868\u5934\u6DFB\u52A0\u65B0\u7684\u5143\u7D20e</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addFirst</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Node node = new Node(e);</span>
    <span class="token comment">// node.next = head;</span>
    <span class="token comment">// head = node;</span>
    <span class="token comment">// \u5BF9\u5176\u4F18\u5316\u540E\u7684\u5199\u6CD5</span>
    head <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> head<span class="token punctuation">)</span><span class="token punctuation">;</span>
    size<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
    * \u5728\u94FE\u8868\u7684index(0-based)\u4F4D\u7F6E\u6DFB\u52A0\u65B0\u7684\u5143\u7D20
    * \u8FD9\u4E2A\u65B9\u6CD5\u5728\u94FE\u8868\u4E2D\u5E76\u4E0D\u662F\u4E00\u4E2A\u5E38\u7528\u7684\u64CD\u4F5C\uFF0C\u53EA\u662F\u7EC3\u4E60\u4F7F\u7528
    */</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">,</span> <span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">&gt;</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;add failed. Illegal index.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// \u5224\u65AD\u7D22\u5F15\u4F4D\u7F6E\u662F\u5426\u662F\u5934\u7ED3\u70B9</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">addFirst</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> prev <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token comment">// \u4F7F\u6307\u9488\u6307\u5411\u7D22\u5F15\u524D\u4E00\u4E2A\u4F4D\u7F6E</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            prev <span class="token operator">=</span> prev<span class="token punctuation">.</span>next<span class="token punctuation">;</span>

        <span class="token comment">// Node node = new Node(e);</span>
        <span class="token comment">// node.next = prev.next;</span>
        <span class="token comment">// prev.next = node;</span>

        prev<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> prev<span class="token punctuation">)</span><span class="token punctuation">;</span>
        size<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5728\u94FE\u8868\u672B\u5C3E\u6DFB\u52A0\u65B0\u7684\u5143\u7D20e</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addLast</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">add</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p>\u4E3A\u94FE\u8868\u8BBE\u7F6E\u865A\u62DF\u7684\u5934\u7ED3\u70B9\uFF0C\u53EF\u4EE5\u7EDF\u4E00\u5728\u4E0D\u540C\u4F4D\u7F6E\u6DFB\u52A0\u7ED3\u70B9\u7684\u64CD\u4F5C</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Node</span> dummyHead<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> size<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token class-name">LinkList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dummyHead <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">,</span> <span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">&gt;</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;add failed. Illegal index.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">Node</span> prev <span class="token operator">=</span> dummyHead<span class="token punctuation">;</span>
    <span class="token comment">// \u4F7F\u6307\u9488\u6307\u5411\u7D22\u5F15\u524D\u4E00\u4E2A\u4F4D\u7F6E</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> index<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        prev <span class="token operator">=</span> prev<span class="token punctuation">.</span>next<span class="token punctuation">;</span>

    <span class="token comment">// Node node = new Node(e);</span>
    <span class="token comment">// node.next = prev.next;</span>
    <span class="token comment">// prev.next = node;</span>

    prev<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> prev<span class="token punctuation">)</span><span class="token punctuation">;</span>
    size<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5728\u94FE\u8868\u5934\u6DFB\u52A0\u65B0\u7684\u5143\u7D20e</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addFirst</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">add</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5728\u94FE\u8868\u672B\u5C3E\u6DFB\u52A0\u65B0\u7684\u5143\u7D20e</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addLast</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">add</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h3 id="read" tabindex="-1"><a class="header-anchor" href="#read" aria-hidden="true">#</a> Read</h3><h3 id="update" tabindex="-1"><a class="header-anchor" href="#update" aria-hidden="true">#</a> Update</h3><h3 id="delete" tabindex="-1"><a class="header-anchor" href="#delete" aria-hidden="true">#</a> Delete</h3><h2 id="\u5B8C\u6574\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#\u5B8C\u6574\u4EE3\u7801" aria-hidden="true">#</a> \u5B8C\u6574\u4EE3\u7801</h2>`,15);function e(t,c){return p}var l=n(a,[["render",e]]);export{l as default};
