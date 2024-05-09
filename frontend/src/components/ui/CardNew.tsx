import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  content?: React.ReactNode;
}

const Card = ({ children } : { children : ReactNode} ) => (
    <div className="rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm dark:border-gray-800 dark:bg-sky-100 dark:text-gray-50">
        {children}
    </div>
);

const CardHeader = ({ children } : { children : ReactNode} ) => (
    <div className="flex flex-col space-y-1.5 p-6">
        {children}
    </div>
);

const CardTitle = ({ title } : { title ?: String} ) => (
    <div className="text-2xl font-semibold leading-none tracking-tight text-center text-gray-950">
        {title}
    </div>
);

const CardContent = ({ children } : { children : ReactNode} ) => (
    <div className="p-6 pt-0">
        {children}
    </div>
);

const CardNew: React.FC<CardProps> = ({ title, content }) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle title={title}/>
        </CardHeader>
        <CardContent>
            {content}
        </CardContent>
    </Card>
  );
};

export default CardNew;
