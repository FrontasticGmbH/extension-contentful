import { Entry, Asset, RichTextContent } from 'contentful';
import { Content } from '@Types/content/Content';
import { Attribute } from '@Types/content/Attribute';

export class ContentfulMapper {
  static contentfulEntryToContent(contentfulEntry: Entry<unknown>): Content {
    const attributes = this.convertContent(contentfulEntry.fields);

    return {
      contentId: contentfulEntry.sys.id,
      contentTypeId: contentfulEntry.sys.contentType.sys.id,
      name: contentfulEntry.sys.id, // TODO: get the display field value for the content type
      slug: contentfulEntry.sys.id, // TODO: asses if we need this field for all content or can be consider an attribute
      attributes: attributes,
    };
  }

  static convertContent(fields: unknown): Attribute[] {
    const attributes: Attribute[] = [];

    for (const [key, value] of Object.entries(fields)) {
      const attribute: Attribute = {
        attributeId: key,
        // TODO: implement a method that can parse non string fields
        content: typeof value === 'string' ? value : this.contentfulNonHomogeneousAttributeToFrontasticAttribute(value),
      };

      attributes.push(attribute);
    }

    return attributes;
  }

  // TODO: refactor method to parse attributes
  static contentfulNonHomogeneousAttributeToFrontasticAttribute(value: unknown) {
    if ((value as RichTextContent).nodeType && (value as RichTextContent).content) return value;
    if ((value as Asset).sys?.type === 'Asset')
      return this.contentfulAssetAttributesToFrontasticAssetAttributes((value as Asset).fields);
  }

  // TODO: refactor method to parse attributes
  static contentfulAssetAttributesToFrontasticAssetAttributes(fields: Asset['fields']) {
    return {
      url: fields.file.url,
      width: fields.file.details.image.width,
      height: fields.file.details.image.height,
    };
  }
}
