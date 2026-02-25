import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { RetexContext } from '../components/retex';
import { RetexViewer } from '../components/retex';
import { projects } from '../assets/contents';
import { PageTransition } from '../components/animations';

/**
 * @component ProjectDetail
 * @description Page for displaying individual project details with deep linking
 *
 * Features:
 * - URL-based project routing (/projects/:projectSlug)
 * - Shareable URLs for specific projects
 * - SEO-friendly with dynamic meta tags
 * - Fallback to 404 for invalid project slugs
 */
const ProjectDetail = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const { setDisplayedRetex } = useContext(RetexContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!projectSlug) {
      navigate('/projects');
      return;
    }

    // Convert slug back to project title
    // Slug format: "gpgtool" -> "GPGtool"
    const project = projects.find((p) => {
      const slug = p.title[0].toLowerCase().replace(/\s+/g, '-');
      return slug === projectSlug.toLowerCase();
    });

    if (project) {
      // Set the project to be displayed in RetexViewer
      setDisplayedRetex(project.title[0]);

      // Update page title for SEO
      document.title = `${project.title[0]} - Clément Barrière`;
    } else {
      // Project not found, redirect to 404
      navigate('/404');
    }

    // Cleanup: close retex when leaving page
    return () => {
      setDisplayedRetex(undefined);
    };
  }, [projectSlug, setDisplayedRetex, navigate]);

  return (
    <PageTransition>
      <RetexViewer />
    </PageTransition>
  );
};

export default ProjectDetail;
