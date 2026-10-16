/** Four-square mark — one square per stack line. */
const BrandMark = ({ size = 26 }: { size?: number }) => (
  <span
    className="grid grid-cols-2 gap-[3px]"
    style={{ width: size, height: size }}
    aria-hidden="true"
  >
    <span className="rounded-[3px] bg-line-frontend" />
    <span className="rounded-[3px] bg-line-backend" />
    <span className="rounded-[3px] bg-line-devops" />
    <span className="rounded-[3px] bg-line-tools" />
  </span>
);

export default BrandMark;
