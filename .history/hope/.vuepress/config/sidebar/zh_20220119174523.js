const zh = [{
    // 必要的，分组的标题文字
    title: "Group 1",
    // 可选的, 分组标题对应的图标
    icon: "bar",
    // 可选的, 分组标题对应的链接
    path: "/foo/",
    // 可选的，会添加到每个 item 链接地址之前
    prefix: "/foo/",
    // 可选的, 设置分组是否可以折叠，默认值是 true,
    collapsable: false,
    // 可选的, 嵌套渲染深度，默认值是 2
    sidebarDepth: 2,
    // 必要的，分组的子项目
    children: ["/"],
}, {
    "/": [
        "",
        "home",
        "slides",
        "layout",
        {
            title: "如何使用",
            icon: "creative",
            prefix: "guide/",
            children: ["", "page", "markdown", "disable", "encrypt"],
        },
    ],
}];

exports { zh};