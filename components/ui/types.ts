// types.ts
export interface Project {
    name: string;
    description: string;
    owner: {
        name: string;
        avatarUrl: string;
    };
    contributors: Array<{
        name: string;
        avatarUrl: string;
    }>;
    issues: Array<{
        id: number;
        title: string;
        state: 'open' | 'closed';
    }>;
    commits: Array<{
        id: string;
        message: string;
        author: {
            name: string;
            avatarUrl: string;
        };
        date: string;
    }>;
}
