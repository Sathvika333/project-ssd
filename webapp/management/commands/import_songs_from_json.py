import json
import os
from django.conf import settings  # Import settings to use BASE_DIR
from django.core.management.base import BaseCommand
from webapp.models import Song

class Command(BaseCommand):
    help = 'Import songs from a JSON file'
    

    # Set the path to your JSON file here, using BASE_DIR to get the absolute path
    JSON_FILE_PATH = os.path.join(settings.BASE_DIR, 'webapp', 'data', 'songs.json')  # Adjust this if needed

    def handle(self, *args, **kwargs):
        json_file = self.JSON_FILE_PATH  # Use the defined path here

        # Print the json_file path for verification
        self.stdout.write(self.style.SUCCESS(f'Using JSON file: {json_file}'))

        try:
            # Open and read the JSON file
            with open(json_file, 'r', encoding='utf-8') as file:
                data = json.load(file)
                # Iterate over each item in the JSON and create Song objects
                for item in data:
                    song = Song(
                        song_name=item.get('song_name'),  # Ensure this matches your model field
                        artist=item.get('artist'),
                        poster=item.get('poster', ''),  # Default to empty string if not present
                        audio_file=item.get('audio_file', '')
                    )
                    song.save()
            
            # If successful, output a success message
            self.stdout.write(self.style.SUCCESS('Successfully imported songs from JSON'))
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'JSON file not found: {json_file}'))
        except json.JSONDecodeError as e:
            self.stdout.write(self.style.ERROR(f'Error decoding JSON: {e}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An unexpected error occurred: {e}'))
