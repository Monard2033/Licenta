// ProjectPage.tsx
import React from 'react';
import { Project } from '@/components/ui/types';
import styles from './ProjectPage.module.css';

interface ProjectPageProps {
    project: Project;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
    return (
        <div className={styles.projectPage}>
            <header className={styles.header}>
                <img src={project.owner.avatarUrl} alt={project.owner.name} className={styles.ownerAvatar} />
                <h1 className={styles.projectName}>{project.name}</h1>
                <p className={styles.projectDescription}>{project.description}</p>
            </header>

            <section className={styles.contributorsSection}>
                <h2>Contributors</h2>
                <div className={styles.contributorsList}>
                    {project.contributors.map((contributor, index) => (
                        <div key={index} className={styles.contributor}>
                            <img src={contributor.avatarUrl} alt={contributor.name} className={styles.contributorAvatar} />
                            <span>{contributor.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.issuesSection}>
                <h2>Issues</h2>
                <ul>
                    {project.issues.map((issue) => (
                        <li key={issue.id} className={styles.issue}>
                            <span className={styles.issueState}>{issue.state}</span> - {issue.title}
                        </li>
                    ))}
                </ul>
            </section>

            <section className={styles.commitsSection}>
                <h2>Commits</h2>
                <ul>
                    {project.commits.map((commit) => (
                        <li key={commit.id} className={styles.commit}>
                            <img src={commit.author.avatarUrl} alt={commit.author.name} className={styles.commitAuthorAvatar} />
                            <span className={styles.commitMessage}>{commit.message}</span> - <span>{commit.date}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default ProjectPage;
