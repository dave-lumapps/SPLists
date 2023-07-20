/**
 *  Create-LumApps-Widget config file
 *  update the following to fit your needs
 */

/**
 * The ids of your partner and extension
 */
const partnerId = {
    beta: '170099712532137311301576503899034709635',
    production: '170099712532137311301576503899034709635',
};

const extensionId = {
    beta: '305757838919488281348047550443609795589',
    production: '',
};

const description = {
    en: 'SharePoint List Viewer',
};

const name = {
    en: 'SharePoint List Viewer',
};

const icon = {
    en:
        'https://www.onmsft.com/wp-content/uploads/2021/04/microsoftlistsappicon.jpg', // a working link to your widget icon
};

const oauth = false;

/**
 * Define the availability of your extension :
 * - open : available for everyone
 * - marketplace : the customer need to have access to the marketplace
 */

const availability = 'marketplace';

/**
 * Define if your extension needs to connect to external service through an application declare on provider side.
 *
 * Uncomment the following block to declare application usage for your extension.
 * Do not forget to add the application attribute in the config object.
 */
/*const application = {
    providerType: '',
};*/

/**
 * The documentation's url of the extension.
 */
const links = {
    documentation: null,
};

/**
 * The components available for your extensions
 * 'content' : For the Widget content itself (required)
 * 'settings' : For your widget settings
 * 'globalSettings' : For global settings used by platform admin.
 */
const components = ['content', 'settings', 'global_settings'];

// Whether the extension is public or not in the marketplace.
const isPublic = true;

/**
 * The list of authorized customer ids.
 *
 * If your extension is not public only these customers will see and
 * will be able to install this extensions.
 */
const whitelist = [];

// do not change the following unless you know what you are doing
const config = {
    availability,
    category: 'widget',
    components,
    description,
    extensionId,
    icon,
    links,
    name,
    oauth,
    partnerId,
    public: isPublic,
    whitelist
};

export default config;
