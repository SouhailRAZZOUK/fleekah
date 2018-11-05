import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

class ImageOwner extends PureComponent {

    render() {
        let { owner } = this.props;

        return <div className="image-details__owner">
            <h3>Photo By</h3>
            <Link to={`/userPhotos/${owner.id}`}>
                {owner.name}
            </Link>
        </div>
    }

}

export default ImageOwner;