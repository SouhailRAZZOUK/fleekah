import React, { PureComponent } from "react";
import sanitizeHTML from "sanitize-html";

class ImageDescription extends PureComponent {

    _handleDescription(description) {
        let sanitized = {
            __html: sanitizeHTML(description, {
                transformTags: {
                    'a': sanitizeHTML.simpleTransform('a', { target: '_blank' })
                }
            })
        };
        if (sanitized.__html) {
            return <div dangerouslySetInnerHTML={sanitized}></div>
        }
        return <p>No description found</p>
    }

    render() {
        let { description } = this.props;
        return <div className="image-details__descritpion">
            <h3>Description</h3>
            {this._handleDescription(description._content)}
        </div>
    }
}

export default ImageDescription;