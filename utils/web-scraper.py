import requests as rqst
from bs4 import BeautifulSoup as bs
import json

base_url = "https://lucy.allakhazam.com/item.html?id="

cookies = {
        'LucySessionID': "e3b05762.61640891349d3",
}

headers = {
    'Created': "Wed, 17 Apr 2024 01:11:33 GMT",
    'Expires': "Wed, 15 May 2024 01:11:33 GMT",
    'Last Accessed': "Wed, 17 Apr 2024 01:23:05 GMT",
    'Path': "/",
    'SameSite': "None",
}

# Load JSON data from output.json
with open('output_enriched.json', 'r') as json_file:
    items = json.load(json_file)
    
print(len(items))

def contains_keyword(line, keywords):
      for keyword in keywords:
        if keyword in line:
            return True
      return False

def extract_details(item):
    temp_url = base_url + str(item['id'])
    temp_url += "&setcookie=1"
    page = rqst.get(temp_url, cookies=cookies)

    soup = bs(page.content, "html.parser")

    table = soup.find_all('td', class_='shotdata')
    
    img_tag = soup.find('img', align='absmiddle', height='40')
    if img_tag:
      img_src = img_tag['src']
    
    td_list = [x for x in table]
    td_strs = [str(x) for x in td_list]
    string = td_strs[0]
    strs = string.replace("<br/>", "")
    final_strs = strs.split("\n")
    clean = final_strs[2:-1]

    result_dict = {}

    # Iterate through each string in the list
    for string in clean:
        if 'Effect' in string:
            continue

        stats_keywords = ["STR", "WIS", "INT", "MANA", "STA", "HP"]
        resistance_keywords = ["SV COLD", "SV FIRE", "SV POISION", "SV DISEASE", "SV MAGIC"]
        if contains_keyword(string, stats_keywords):
            name = 'Stats'
            values = string
            cleaned_values = [values.replace('<br>', '')] 
        elif contains_keyword(string, resistance_keywords):
            name = 'Resistances'
            values = string
            cleaned_values = [values.replace('<br>', '')] 
        elif ':' not in string:
            name = 'Extra'
            values = string
            cleaned_values = [values.strip().replace('<br>', '').replace('</a>', '')]        
        elif 'Slot' in string and 'Type' in string:
            name = 'Other'
            values = string
            # Clean up values by removing <br> and splitting into a list
            cleaned_values = [values.replace('<br>', ' ')]
        else:
            # Split the string by ':'
            name, values = string.split(':', 1)
          
            # Remove leading and trailing whitespace from name
            name = name.strip()

            # Clean up values by removing <br> and splitting into a list
            cleaned_values = [value.strip().replace('<br>', '') for value in values.split()]
        
        # Add the name and cleaned values to the result_dict
        result_dict[name] = cleaned_values
        
    result_dict['imgsrc'] = img_src
    return result_dict


# Iterate through each item in the JSON data and enhance it with detailed information
for index, item in enumerate(items[110000:134079]):
    print(f"Iteration: {index + 1}, Item ID: {item['id']}")
    item_info = extract_details(item)
    item['information'] = item_info

# Save updated JSON data to output_enriched.json
with open('output_enriched.json', 'w') as json_file:
    json.dump(items, json_file, indent=2)
    