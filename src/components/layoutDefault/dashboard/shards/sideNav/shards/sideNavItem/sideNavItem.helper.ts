import { Link } from "react-router-dom";

const useSideNavItemHelper = (external: any, path: any) => {
    const linkProps = path
        ? external
            ? {
                component: "a",
                href: path,
                target: "_blank",
            }
            : {
                component: Link,
                to: path,
            }
        : {};

    return {
        linkProps
    };
};

export default useSideNavItemHelper;
