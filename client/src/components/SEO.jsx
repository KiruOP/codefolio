import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, name }) => {
  const siteTitle = title ? `${title} | CodeFolio` : 'CodeFolio | Developer Portfolio Engine';
  const metaDescription = description || 'A modern developer portfolio powered by CodeFolio.';

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name='description' content={metaDescription} />
      {/* OpenGraph tags */}
      <meta property='og:type' content='website' />
      {name && <meta property='og:title' content={`${name}'s Portfolio`} />}
      <meta property='og:description' content={metaDescription} />
      {/* Twitter tags */}
      <meta name='twitter:creator' content={name || 'CodeFolio'} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={siteTitle} />
      <meta name='twitter:description' content={metaDescription} />
    </Helmet>
  );
};

export default SEO;
