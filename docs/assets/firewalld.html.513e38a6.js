import{_ as s,e as n}from"./app.2b585479.js";const a={},e=n(`<p>\u5728 CentOs 7 \u4E2D firewalld,iptables,ebtables \u8FD9\u4E09\u79CD\u9632\u706B\u5899\u662F\u5171\u5B58\u7684\u3002</p><p>\u4F46\u662F\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u4F7F\u7528 firewalld \u6765\u7BA1\u7406 netfilter \u5B50\u7CFB\u7EDF\u3002</p><h2 id="firewalld-\u7684\u57FA\u672C\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#firewalld-\u7684\u57FA\u672C\u4F7F\u7528" aria-hidden="true">#</a> firewalld \u7684\u57FA\u672C\u4F7F\u7528</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u542F\u52A8</span>
systemctl start firewalld
<span class="token comment"># \u5173\u95ED</span>
systemctl stop firewalld
<span class="token comment"># \u67E5\u770B\u72B6\u6001</span>
systemctl status firewalld 
<span class="token comment"># \u5F00\u673A\u7981\u7528 </span>
systemctl disable firewalld
<span class="token comment"># \u5F00\u673A\u542F\u7528</span>
systemctl <span class="token builtin class-name">enable</span> firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>systemctl \u662F CentOS 7 \u7684\u670D\u52A1\u7BA1\u7406\u5DE5\u5177\u4E2D\u4E3B\u8981\u7684\u5DE5\u5177</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u542F\u52A8\u4E00\u4E2A\u670D\u52A1</span>
systemctl start firewalld.service
<span class="token comment"># \u5173\u95ED\u4E00\u4E2A\u670D\u52A1</span>
systemctl stop firewalld.service
<span class="token comment"># \u91CD\u542F\u4E00\u4E2A\u670D\u52A1</span>
systemctl restart firewalld.service
<span class="token comment"># \u663E\u793A\u4E00\u4E2A\u670D\u52A1\u7684\u72B6\u6001</span>
systemctl status firewalld.service
<span class="token comment"># \u5728\u5F00\u673A\u65F6\u542F\u7528\u4E00\u4E2A\u670D\u52A1</span>
systemctl <span class="token builtin class-name">enable</span> firewalld.service
<span class="token comment"># \u5728\u5F00\u673A\u65F6\u7981\u7528\u4E00\u4E2A\u670D\u52A1</span>
systemctl disable firewalld.service
<span class="token comment"># \u67E5\u770B\u670D\u52A1\u662F\u5426\u5F00\u673A\u542F\u52A8</span>
systemctl is-enabled firewalld.service
<span class="token comment"># \u67E5\u770B\u5DF2\u542F\u52A8\u7684\u670D\u52A1\u5217\u8868</span>
systemctl list-unit-files<span class="token operator">|</span><span class="token function">grep</span> enabled
<span class="token comment"># \u67E5\u770B\u542F\u52A8\u5931\u8D25\u7684\u670D\u52A1\u5217\u8868</span>
systemctl --failed
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="\u914D\u7F6E-firewalld-cmd" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E-firewalld-cmd" aria-hidden="true">#</a> \u914D\u7F6E firewalld-cmd</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B\u9632\u706B\u5899\u7248\u672C\uFF1A </span>
firewall-cmd --version
<span class="token comment"># \u67E5\u770B\u5E2E\u52A9\uFF1A </span>
firewall-cmd --help
<span class="token comment"># \u663E\u793A\u72B6\u6001\uFF1A </span>
firewall-cmd --state
<span class="token comment"># \u67E5\u770B\u6240\u6709\u6253\u5F00\u7684\u7AEF\u53E3\uFF1A </span>
firewall-cmd --zone<span class="token operator">=</span>public --list-ports
<span class="token comment"># \u66F4\u65B0\u9632\u706B\u5899\u89C4\u5219\uFF1A </span>
firewall-cmd --reload
<span class="token comment"># \u67E5\u770B\u533A\u57DF\u4FE1\u606F:  </span>
firewall-cmd --get-active-zones
<span class="token comment"># \u67E5\u770B\u6307\u5B9A\u63A5\u53E3\u6240\u5C5E\u533A\u57DF\uFF1A </span>
firewall-cmd --get-zone-of-interface<span class="token operator">=</span>eth0
<span class="token comment"># \u62D2\u7EDD\u6240\u6709\u5305\uFF1A</span>
firewall-cmd --panic-on
<span class="token comment"># \u53D6\u6D88\u62D2\u7EDD\u72B6\u6001\uFF1A </span>
firewall-cmd --panic-off
<span class="token comment"># \u67E5\u770B\u662F\u5426\u62D2\u7EDD\uFF1A </span>
firewall-cmd --query-panic 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="\u7AEF\u53E3\u7684\u5F00\u653E\u5173\u95ED\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u7AEF\u53E3\u7684\u5F00\u653E\u5173\u95ED\u64CD\u4F5C" aria-hidden="true">#</a> \u7AEF\u53E3\u7684\u5F00\u653E\u5173\u95ED\u64CD\u4F5C</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u6DFB\u52A0</span>
firewall-cmd --zone<span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">80</span>/tcp --permanent    \uFF08--permanent\u6C38\u4E45\u751F\u6548\uFF0C\u6CA1\u6709\u6B64\u53C2\u6570\u91CD\u542F\u540E\u5931\u6548\uFF09
<span class="token comment"># \u91CD\u65B0\u8F7D\u5165</span>
firewall-cmd --reload
<span class="token comment"># \u67E5\u770B\u7AEF\u53E3\u662F\u5426\u5F00\u653E</span>
firewall-cmd --zone<span class="token operator">=</span> public --query-port<span class="token operator">=</span><span class="token number">80</span>/tcp
<span class="token comment"># \u5220\u9664\u5DF2\u5F00\u653E\u7684\u7AEF\u53E3</span>
firewall-cmd --zone<span class="token operator">=</span> public --remove-port<span class="token operator">=</span><span class="token number">80</span>/tcp --permanent
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="\u8C03\u6574\u9ED8\u8BA4\u7B56\u7565" tabindex="-1"><a class="header-anchor" href="#\u8C03\u6574\u9ED8\u8BA4\u7B56\u7565" aria-hidden="true">#</a> \u8C03\u6574\u9ED8\u8BA4\u7B56\u7565</h2><p>\u9ED8\u8BA4\u62D2\u7EDD\u6240\u6709\u8BBF\u95EE\uFF0C\u6539\u6210\u5141\u8BB8\u6240\u6709\u8BBF\u95EE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u8C03\u6574\u7B56\u7565 \u662F\u7684\u5176\u4ED6\u7AEF\u53E3\u53EF\u4EE5\u8BBF\u95EE</span>
firewall-cmd --permanent --zone<span class="token operator">=</span>public --set-target<span class="token operator">=</span>ACCEPT
firewall-cmd --reload
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="\u5BF9\u67D0\u4E2Aip\u5F00\u653E\u591A\u4E2A\u7AEF\u53E3" tabindex="-1"><a class="header-anchor" href="#\u5BF9\u67D0\u4E2Aip\u5F00\u653E\u591A\u4E2A\u7AEF\u53E3" aria-hidden="true">#</a> \u5BF9\u67D0\u4E2AIP\u5F00\u653E\u591A\u4E2A\u7AEF\u53E3</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>firewall-cmd --permanent --add-rich-rule<span class="token operator">=</span><span class="token string">&quot;rule family=&quot;</span>ipv4<span class="token string">&quot; source address=&quot;</span><span class="token number">10.159</span>.60.29<span class="token string">&quot; port protocol=&quot;</span>tcp<span class="token string">&quot; port=&quot;</span><span class="token number">1</span>:65535<span class="token string">&quot; accept&quot;</span>
<span class="token comment"># \u91CD\u542F\u9632\u706B\u5899\u4F7F\u8BBE\u5B9A\u751F\u6548</span>
firewall-cmd --reload
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,15);function l(r,p){return e}var t=s(a,[["render",l]]);export{t as default};
