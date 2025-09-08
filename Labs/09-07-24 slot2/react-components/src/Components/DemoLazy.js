import React, { Suspense, lazy } from "react";
function delayImport(ms) {
    return (component) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(component), ms);
        });
    };
}
// Lazy-loaded components with React.lazy
const Home = lazy(() => delayImport(3000)(import('../Shared/Home')));
const About = lazy(() => import('../Shared/About'));
function DemoLazyComponent() {
    return (
        <div>
            <Suspense fallback={<div>Loading</div>}>
                {/* The Home component will load lazily */}
                <Home />
            </Suspense>
            <Suspense fallback={<div>Loading</div>}>
                {/* The About component will load lazily */}
                <About />
            </Suspense>
        </div>
    );
}
export default DemoLazyComponent;
