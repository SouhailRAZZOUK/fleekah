import React, { PureComponent } from "react";
import { ChipSet, Chip } from '@material/react-chips';

import "@material/react-chips/dist/chips.css";

class ImageTags extends PureComponent {

    constructor() {
        super();
        this._renderTags = this._renderTags.bind(this);
        this._renderTag = this._renderTag.bind(this);
    }

    _renderTag(tag, key) {
        return <Chip key={key} id={tag} label={tag} />
    }

    _renderTags(tags) {
        return <ChipSet>
            {tags.map(this._renderTag)}
        </ChipSet>
    }

    render() {
        let { tags } = this.props;
        return <div className="image-details__tags">
            <h3>Tags</h3>
            {
                tags && tags.length > 0 ?
                    this._renderTags(tags) :
                    <p>No tags found</p>
            }
        </div>
    }
}

export default ImageTags;