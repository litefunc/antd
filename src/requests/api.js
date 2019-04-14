import fetch from './fetch';

const protocol = 'http'
const host = 'localhost';
const port = '8088';

const HOST = `${protocol}://${host}:${port}`

function Url(api) {
    return `${HOST}/${api}`
}

const req = (api = '', data = {}, method = 'GET', type = 'json') => fetch(Url(api), data, method, type)

const Get = url => req(url, {}, 'GET');
const PostForm = (url, data) => req(url, data, 'POST', 'form-data');
const PostJson = (url, data) => req(url, data, 'POST', 'json');
const PutForm = (url, data) => req(url, data, 'PUT', 'form-data');
const DeleteForm = (url, data) => req(url, data, 'DELETE', 'form-data');

export const json = () => Get(`test/json`);
export const text = () => Get(`test/text`);
export const raw = () => Get(`test/raw`);
export const ids = () => Get(`ids/list`);
export const cols = () => Get(`cols/list`);
export const mysum = (data) => PostJson(`data/list`, data);

export { HOST, Url }