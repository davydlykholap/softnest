export function PublishingGuide() {
  return <div style={{ maxWidth: 720, padding: 32, lineHeight: 1.6 }}>
    <h2>Publish a website change</h2>
    <ol>
      <li>Edit the content and press <strong>Publish</strong> to save the public version in Sanity.</li>
      <li>Sanity automatically starts the GitHub Pages build after you publish. You do not need to open GitHub.</li>
      <li>Allow a few minutes for validation and deployment, then check the public website.</li>
    </ol>
    <p>If the automatic build does not start, <a href="https://github.com/davydlykholap/softnest/actions/workflows/deploy-pages.yml" target="_blank" rel="noreferrer">open deployment status or run it manually</a>.</p>
    <p>Published changes go live after a successful build. Saving a draft does not start deployment. If a build fails, the currently deployed website stays online.</p>
    <h3>Where to edit</h3>
    <p><strong>Pages:</strong> Homepage text and Our Work introductions, including the empty-city message. Use {"{{city}}"} where the city name should appear. The About page is currently maintained in website code.</p>
    <p><strong>Services:</strong> cleaning service descriptions, images, FAQs and service-page settings.</p>
    <p><strong>Locations:</strong> Cities &amp; coverage manages service areas; City page text edits city introductions; City service page text edits a specific service in a city.</p>
    <p><strong>Our Work → All projects → Create:</strong> create one project for each appointment. Project details contains the title, address, city and services; Photos &amp; videos contains the cover and ordered media; Description &amp; story contains the appointment description, Before cleaning, What we did and The result; Publishing contains website approval and display settings.</p>
    <p><strong>Our Work → Projects by city:</strong> choose a city to see its projects. Creating a project there fills in the city automatically. The approval views show the same project records, without making copies. Create new projects through All projects or Projects by city.</p>
    <p><strong>Customer Reviews / FAQs:</strong> customer feedback and reusable questions and answers.</p>
    <p><strong>Blog:</strong> Articles, Authors and Categories.</p>
    <p><strong>Settings:</strong> Business &amp; contact details and Quote form choices.</p>
    <p><strong>One cleaning appointment = one project.</strong> Generate its project address once, choose a cover image, and add optional introduction, problem, treatment and result text. Add photos, comparisons and videos under Additional photos &amp; videos, then drag them into order. Videos support MP4/WebM uploads or YouTube/Vimeo links, with optional captions and a transcript. Display order controls the city preview; up to six projects appear there, with the complete collection in its city gallery.</p>
    <p>For a project, select <strong>Approved for website</strong> under Website approval, then press <strong>Publish</strong>. Awaiting approval and Hidden from website projects stay off the website. Projects include a Website preview tab opening the individual project after a successful deployment. Publication date on an article is display information, not a scheduler.</p>
  </div>;
}
