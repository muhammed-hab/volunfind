PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
  category VARCHAR(255) NOT NULL PRIMARY KEY
);

DROP TABLE IF EXISTS nonprofits;
CREATE TABLE `nonprofits` (
  `id` integer PRIMARY KEY AUTOINCREMENT,
  `name` varchar(255) NOT NULL,
  `home_url` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `logo_url` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `category` varchar(255) NOT NULL,
  FOREIGN KEY (`category`) REFERENCES `categories` (`category`) ON DELETE RESTRICT ON UPDATE CASCADE
);

drop TABLE IF exists times;
CREATE TABLE `times` (
  `day` char(9) CHECK (day in ('sunday','monday','tuesday','wednesday','thursday','friday','saturday')) NOT NULL,
  `nonprofitid` int NOT NULL,
  `start` decimal(3,1) NOT NULL,
  `end` decimal(3,1) NOT NULL,
  FOREIGN KEY (`nonprofitid`) REFERENCES `nonprofits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX nonprofitlink_idx on times(nonprofitid);
CREATE INDEX day_idx on times(day);
create INDEX time_start_idx on times(start);
create INDEX time_end_idx on times(`end`);


INSERT INTO categories (category) VALUES ('Animal Shelter'), ('Recreational Center');
INSERT INTO nonprofits (name, home_url, image_url, logo_url, description, category) VALUES
('NORDC',
'https://nordc.org/home/',
'https://nordc.org/getattachment/Activities/Outdoors/Canoeing-2.jpg/?lang=en-US&width=400&height=300',
'https://nordc.org/getattachment/About/Media-and-Marketing/NORD-Commission-text-Logo_v1KR.png/',
'The New Orleans Recreation Development Commission offers recreation activities, classes, programs and special events for all ages at recreation centers, pools and playgrounds across New Orleans.',
'Recreational Center'),

('ASPCA',
'https://www.aspca.org/',
'https://www.dogtime.com/assets/uploads/2017/08/aspca-nyc-dogs-2-1280x720.jpg',
'https://1000logos.net/wp-content/uploads/2020/09/ASPCA-logo.png',
'Learn more about the ASPCA''s work to rescue animals from abuse, pass humane laws and share resources with shelters nationwide. Join our fight today!',
'Animal Shelter');

INSERT INTO times (nonprofitid, day, start, end) VALUES (1, 'saturday', 11, 14), (1, 'sunday', 10.5, 13), (1, 'monday', 6, 9),
(2, 'saturday', 10, 11), (2, 'sunday', 11, 16), (2, 'tuesday', 5, 9);