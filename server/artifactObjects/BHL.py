from artifactInterface import baseArtifact
import os
import urllib2

class BHLObject(baseArtifact):

    def validateUrl(self, url):
        """Validate user input as valid URL for a BHL artifact."""
        if pattern.match("https?://www.biodiversitylibrary.org/(page|item)/[0-9]*"):
            self.url = url
            return True
        else:
            return False

    def parseID(self):
        """Parse out Item ID from URL"""
        splitURL = (self.url).split("/")
        itemID = splitURL[4].split('#')[0]
        return itemID

    def getArtifactData(self, itemID):
        """Based on Item ID, fetch artifact info from either our database or a museum API"""
        # Get title ID from BHL's GetItemMetadata endpoint
        apiKey = os.environ['BHLKey']
        getItemMetadataURL = "http://www.biodiversitylibrary.org/api2/httpquery.ashx?op=GetItemMetadata&itemid=%s&pages=t&ocr=f&parts=f&apikey=%s" %(itemID,apiKey)
        itemData = urllib2.urlopen(getItemMetadataURL).read()
        titleID = itemData.split("<PrimaryTitleID>")[1].split("</PrimaryTitleID>")[0]
        # Get author, title, and year from BHL's GetTitleMetadata endpoint
        getTitleMetadataURL = "http://www.biodiversitylibrary.org/api2/httpquery.ashx?op=GetTitleMetadata&titleid=%s&items=t&apikey=%s" %(titleID, apiKey)
        titleData = urllib2.urlopen(getTitleMetadataURL).read()
        author = titleData.split("<Name>")[1].split("</Name>")[0]
        title = titleData.split("<FullTitle>")[1].split("</FullTitle>")[0]
        if "<PublicationDate>" in titleData:
            year = titleData.split("<PublicationDate>")[1].split("</PublicationDate>")[0]
        elif "Year" in titleData:
            year = titleData.split("<Year>")[1].split("</Year>")[0]
        else:
            year = None
        return[author, title, year]