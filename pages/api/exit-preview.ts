export default async function exit(req: any, res: any) {
  const redirectUrl = req.query?.redirect ? req.query.redirect : '/';
  res.clearPreviewData();
  res.writeHead(307, { Location: redirectUrl });
  res.end();
}
