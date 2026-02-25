import {Route, Routes, useLocation } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import { Home, Err404, Projects, ProjectDetail, Blog, BlogPost, Career, Showcase, GlitchDemo } from '../pages'

/**
 * @component AnimatedRoutes
 * @description Wrapper for routes with AnimatePresence for page transitions
 */
export const AnimatedRoutes = () => {
    const location = useLocation();

    return (
    <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectSlug" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/career" element={<Career />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/glitch-demo" element={<GlitchDemo />} />
        <Route path="/*" element={<Err404 />} />
        </Routes>
    </AnimatePresence>
    );
};