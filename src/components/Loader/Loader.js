import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Loader({ height }) {
    return (
        <div className="mb-10">
            <SkeletonTheme baseColor="#e9e9e9" highlightColor="#d3d3d3">
                <Skeleton height={height} />
            </SkeletonTheme>
        </div>
    )
}

export default Loader
