'use client';

type Props = {
    schema: object;
};

export const SchemaMarkup = ({ schema }: Props) => {
    const rawJson = JSON.stringify(schema);

    // Кастомная замена: только если не содержит wp-content
    const processedJson = rawJson.replace(/https:\/\/limited-kicks\.ru\/admin\/(?!wp-content)([^"]*)/g, 'https://limited-kicks.ru/$1');

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: processedJson }}
        />
    );
};